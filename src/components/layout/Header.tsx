
import { useState, useEffect } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wifi, BatteryFull, Clock, WifiOff, BatteryLow, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const Header = () => {
    const [time, setTime] = useState(new Date());
    const { isConnected, deviceStatus } = useWebSocket();
    const { user, profile, signOut, loading } = useAuth();

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
    
    const getInitials = (name: string | undefined | null) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

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
                
                {loading ? (
                    <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                ) : user ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                                    <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={signOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild variant="outline">
                        <Link to="/auth">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
