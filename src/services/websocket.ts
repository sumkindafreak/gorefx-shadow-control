export interface DeviceStatus {
  connected: boolean;
  ip?: string;
  uptime?: number;
  freeHeap?: number;
  wifiStrength?: number;
  battery?: number;
}

export interface DeviceCommand {
  type: 'lighting' | 'audio' | 'effects' | 'dmx' | 'system';
  action: string;
  value?: number | boolean | string;
  channel?: number;
}

export interface DeviceResponse {
  type: 'status' | 'ack' | 'error' | 'data';
  data?: any;
  message?: string;
  timestamp?: number;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private pingInterval: NodeJS.Timeout | null = null;
  private callbacks: { [key: string]: Function[] } = {};

  connect(ip: string = '192.168.4.1', port: number = 81): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = `ws://${ip}:${port}`;
        console.log(`Connecting to ESP32 at ${wsUrl}`);
        
        this.ws = new WebSocket(wsUrl);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected to ESP32');
          this.reconnectAttempts = 0;
          this.startPing();
          this.emit('connected', { ip, port });
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const response: DeviceResponse = JSON.parse(event.data);
            console.log('Received from ESP32:', response);
            this.emit('message', response);
            
            if (response.type === 'status') {
              this.emit('status', response.data);
            } else if (response.type === 'error') {
              this.emit('error', response.message);
            }
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.stopPing();
          this.emit('disconnected');
          this.attemptReconnect(ip, port);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.emit('error', 'Connection failed');
          reject(false);
        };

      } catch (error) {
        console.error('Failed to create WebSocket:', error);
        reject(false);
      }
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopPing();
    this.reconnectAttempts = this.maxReconnectAttempts;
  }

  sendCommand(command: DeviceCommand): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        ...command,
        timestamp: Date.now()
      });
      console.log('Sending to ESP32:', message);
      this.ws.send(message);
      return true;
    }
    console.warn('WebSocket not connected');
    return false;
  }

  sendRawCommand(command: string): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'command',
        command: command,
        timestamp: new Date().toISOString()
      });
      console.log('Sending raw command to ESP32:', message);
      this.ws.send(message);
      return true;
    }
    console.warn('WebSocket not connected, cannot send raw command');
    return false;
  }

  requestStatus() {
    return this.sendCommand({
      type: 'system',
      action: 'status'
    });
  }

  private startPing() {
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Ping every 30 seconds
  }

  private stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private attemptReconnect(ip: string, port: number) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
      
      setTimeout(() => {
        this.connect(ip, port).catch(() => {
          console.log('Reconnection failed');
        });
      }, this.reconnectInterval);
    } else {
      console.log('Max reconnection attempts reached');
      this.emit('maxReconnectReached');
    }
  }

  on(event: string, callback: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data?: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data));
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const websocketService = new WebSocketService();
