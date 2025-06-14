
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Plug, Settings } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

const WebSocketConnection = () => {
  const [ipAddress, setIpAddress] = useState('192.168.4.1');
  const [port, setPort] = useState('81');
  const { isConnected, deviceStatus, connectionError, connect, disconnect, requestStatus } = useWebSocket();

  const handleConnect = () => {
    connect(ipAddress, parseInt(port));
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="w-5 h-5" />
          ESP32 Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
            {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          {deviceStatus.ip && (
            <span className="text-sm text-muted-foreground">
              {deviceStatus.ip}
            </span>
          )}
        </div>

        {connectionError && (
          <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
            {connectionError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            placeholder="IP Address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            disabled={isConnected}
          />
          <Input
            placeholder="Port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            disabled={isConnected}
          />
          <Button
            onClick={isConnected ? handleDisconnect : handleConnect}
            variant={isConnected ? "destructive" : "default"}
            className="w-full"
          >
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>

        {isConnected && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Uptime:</span>
              <span className="ml-2">{Math.floor((deviceStatus.uptime || 0) / 1000)}s</span>
            </div>
            <div>
              <span className="text-muted-foreground">Free Heap:</span>
              <span className="ml-2">{deviceStatus.freeHeap || 0} bytes</span>
            </div>
          </div>
        )}

        {isConnected && (
          <Button variant="outline" size="sm" onClick={requestStatus} className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Request Status
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WebSocketConnection;
