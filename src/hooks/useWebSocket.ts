
import { useState, useEffect, useCallback } from 'react';
import { websocketService, DeviceStatus, DeviceCommand, DeviceResponse } from '@/services/websocket';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({ connected: false });
  const [lastMessage, setLastMessage] = useState<DeviceResponse | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const handleConnected = () => {
      setIsConnected(true);
      setConnectionError(null);
      console.log('WebSocket connected');
    };

    const handleDisconnected = () => {
      setIsConnected(false);
      setDeviceStatus({ connected: false });
      console.log('WebSocket disconnected');
    };

    const handleMessage = (response: DeviceResponse) => {
      setLastMessage(response);
    };

    const handleStatus = (status: DeviceStatus) => {
      setDeviceStatus(status);
    };

    const handleError = (error: string) => {
      setConnectionError(error);
      console.error('WebSocket error:', error);
    };

    const handleMaxReconnect = () => {
      setConnectionError('Failed to reconnect to device');
    };

    // Register event listeners
    websocketService.on('connected', handleConnected);
    websocketService.on('disconnected', handleDisconnected);
    websocketService.on('message', handleMessage);
    websocketService.on('status', handleStatus);
    websocketService.on('error', handleError);
    websocketService.on('maxReconnectReached', handleMaxReconnect);

    return () => {
      // Cleanup event listeners
      websocketService.off('connected', handleConnected);
      websocketService.off('disconnected', handleDisconnected);
      websocketService.off('message', handleMessage);
      websocketService.off('status', handleStatus);
      websocketService.off('error', handleError);
      websocketService.off('maxReconnectReached', handleMaxReconnect);
    };
  }, []);

  const connect = useCallback(async (ip?: string, port?: number) => {
    try {
      await websocketService.connect(ip, port);
    } catch (error) {
      setConnectionError('Failed to connect to device');
    }
  }, []);

  const disconnect = useCallback(() => {
    websocketService.disconnect();
  }, []);

  const sendCommand = useCallback((command: DeviceCommand) => {
    return websocketService.sendCommand(command);
  }, []);

  const sendRawCommand = useCallback((command: string) => {
    return websocketService.sendRawCommand(command);
  }, []);

  const requestStatus = useCallback(() => {
    return websocketService.requestStatus();
  }, []);

  return {
    isConnected,
    deviceStatus,
    lastMessage,
    connectionError,
    connect,
    disconnect,
    sendCommand,
    sendRawCommand,
    requestStatus
  };
};
