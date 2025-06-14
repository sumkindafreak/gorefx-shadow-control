
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

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, href: "#" },
  { title: "Live Controls", icon: RadioTower, href: "#" },
  { title: "Timeline Editor", icon: GanttChart, href: "#" },
  { title: "Custom Commands", icon: Terminal, href: "#" },
  { title: "Show Library", icon: Library, href: "#" },
  { title: "HauntSync Community", icon: Users, href: "#" },
];

const connectivityNav = [
  { title: "ESP/Arduino Devices", icon: Cpu, href: "#" },
  { title: "DMX", icon: Projector, href: "#" },
  { title: "Audio Sync", icon: AudioLines, href: "#" },
];

const eventSequencerNav = [
  { title: "Show Schedule", icon: Calendar, href: "#" },
  { title: "Emergency", icon: Siren, href: "#" },
  { title: "Event Logs", icon: History, href: "#" },
];

const systemNav = [
  { title: "Show Analysis", icon: BarChart, href: "#" },
  { title: "Remote Access", icon: Signal, href: "#" },
  { title: "Weather Integration", icon: CloudSun, href: "#" },
  { title: "IP Webcam Viewer", icon: Camera, href: "#" },
  { title: "Firmware", icon: HardDrive, href: "#" },
];

const AppSidebar = () => {
    const { state } = useSidebar();
    
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2 justify-center">
                    <img src="/gorefx_logo.png" alt="GoreFX" className="w-8 h-8" />
                    {state === 'expanded' && <h2 className="text-lg font-bold font-spectral tracking-widest">GoreFX</h2>}
                </div>
            </SidebarHeader>
            <SidebarContent className="p-0">
                <SidebarMenu>
                    {mainNav.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <a href={item.href}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                
                <SidebarGroup>
                    <SidebarGroupLabel>Connectivity</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                             {connectivityNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                
                <SidebarGroup>
                    <SidebarGroupLabel>Event Sequencer</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                             {eventSequencerNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                     <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                             {systemNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="App Settings">
                            <a href="#">
                                <Settings />
                                <span>App Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Help & Support">
                            <a href="#">
                                <HelpCircle />
                                <span>Help & Support</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
