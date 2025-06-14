
import { useState, useEffect } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wifi, BatteryFull, Clock, WifiOff, BatteryLow } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWebSocket } from '@/hooks/useWebSocket';

const Header = () => {
    const [time, setTime] = useState(new Date());
    const { isConnected, deviceStatus } = useWebSocket();

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const getBatteryIcon = () => {
        if (!isConnected || deviceStatus.battery === undefined) {
             return null;
        }
        if (deviceStatus.battery < 20) {
            return <BatteryLow size={16} className="text-destructive" />;
        }
        return <BatteryFull size={16} />;
    };

    return (
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card/20 px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="w-full flex-1">
                {/* Future content like breadcrumbs can go here */}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className={cn("flex items-center gap-2 transition-colors", isConnected ? "text-green-400" : "text-destructive")}>
                    {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
                    <span>{isConnected ? "Connected" : "Offline"}</span>
                </div>
                {isConnected && deviceStatus.battery !== undefined && (
                    <div className="flex items-center gap-2">
                        {getBatteryIcon()}
                        <span>{deviceStatus.battery}%</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{time.toLocaleTimeString()}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
