
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, RadioTower, GanttChart, Terminal, Library, Users, Cpu, Projector, AudioLines, Calendar, Siren, History, BarChart, Signal, CloudSun, Camera, HardDrive, Settings, HelpCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, to: "/" },
  { title: "Live Controls", icon: RadioTower, to: "/live-controls" },
  { title: "Timeline Editor", icon: GanttChart, to: "/timeline-editor" },
  { title: "Custom Commands", icon: Terminal, to: "/custom-commands" },
  { title: "Show Library", icon: Library, to: "/show-library" },
  { title: "HauntSync Community", icon: Users, to: "/community" },
];

const connectivityNav = [
  { title: "ESP/Arduino Devices", icon: Cpu, to: "/devices" },
  { title: "DMX", icon: Projector, to: "/dmx" },
  { title: "Audio Sync", icon: AudioLines, to: "/audio-sync" },
];

const eventSequencerNav = [
  { title: "Show Schedule", icon: Calendar, to: "/show-schedule" },
  { title: "Emergency", icon: Siren, to: "/emergency" },
  { title: "Event Logs", icon: History, to: "/event-logs" },
];

const systemNav = [
  { title: "Show Analysis", icon: BarChart, to: "/analysis" },
  { title: "Remote Access", icon: Signal, to: "/remote-access" },
  { title: "Weather Integration", icon: CloudSun, to: "/weather" },
  { title: "IP Webcam Viewer", icon: Camera, to: "/webcam" },
  { title: "Firmware", icon: HardDrive, to: "/firmware" },
];

const AppSidebar = () => {
    const { state, setOpen, isMobile, setOpenMobile } = useSidebar();
    
    const handleMenuItemClick = () => {
      if (isMobile) {
        setOpenMobile(false);
      } else {
        setOpen(false);
      }
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-center p-2 h-[60px]">
                    <img
                        src="/lovable-uploads/7b515ee1-bcf7-41c6-bc79-85cb6df5d491.png"
                        alt="GoreFX"
                        className={state === 'expanded' ? 'h-14 object-contain' : 'w-12 h-12 object-contain'}
                    />
                </div>
            </SidebarHeader>
            <SidebarContent className="p-0 h-0 flex-1">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-2 p-2">
                        <SidebarMenu>
                            {mainNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link to={item.to} onClick={handleMenuItemClick}>
                                            {item.title === 'HauntSync Community' ? (
                                                <img src="/lovable-uploads/12c72298-b7aa-45cf-bfc7-92536da9392a.png" alt="HauntSync Community" className="w-4 h-4" />
                                            ) : (
                                                <item.icon />
                                            )}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel>Connectivity</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                     {connectivityNav.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild tooltip={item.title}>
                                                <Link to={item.to} onClick={handleMenuItemClick}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel>Event Sequencer</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                     {eventSequencerNav.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild tooltip={item.title}>
                                                <Link to={item.to} onClick={handleMenuItemClick}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel>System</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                     {systemNav.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild tooltip={item.title}>
                                                <Link to={item.to} onClick={handleMenuItemClick}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </div>
                </ScrollArea>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="App Settings">
                            <Link to="/settings" onClick={handleMenuItemClick}>
                                <Settings />
                                <span>App Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Help & Support">
                            <Link to="/help" onClick={handleMenuItemClick}>
                                <HelpCircle />
                                <span>Help & Support</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
