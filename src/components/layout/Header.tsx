
import { useState, useEffect } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wifi, BatteryFull, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
    const [time, setTime] = useState(new Date());
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    // Simulate connection fluctuation for demo
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsConnected(Math.random() > 0.1); // 90% chance to be connected
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card/20 px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="w-full flex-1">
                {/* Future content like breadcrumbs can go here */}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className={cn("flex items-center gap-2 transition-colors", isConnected ? "text-green-400" : "text-destructive")}>
                    <Wifi size={16} />
                    <span>{isConnected ? "Connected" : "Offline"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BatteryFull size={16} />
                    <span>98%</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{time.toLocaleTimeString()}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
