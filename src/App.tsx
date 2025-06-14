
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import all newly added pages
import LiveControls from "./pages/LiveControls";
import TimelineEditor from "./pages/TimelineEditor";
import CustomCommands from "./pages/CustomCommands";
import ShowLibrary from "./pages/ShowLibrary";
import Community from "./pages/Community";
import Devices from "./pages/Devices";
import DMX from "./pages/DMX";
import AudioSync from "./pages/AudioSync";
import ShowSchedule from "./pages/ShowSchedule";
import Emergency from "./pages/Emergency";
import EventLogs from "./pages/EventLogs";
import Analysis from "./pages/Analysis";
import RemoteAccess from "./pages/RemoteAccess";
import Weather from "./pages/Weather";
import Webcam from "./pages/Webcam";
import Firmware from "./pages/Firmware";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Main nav */}
          <Route path="/live-controls" element={<LiveControls />} />
          <Route path="/timeline-editor" element={<TimelineEditor />} />
          <Route path="/custom-commands" element={<CustomCommands />} />
          <Route path="/show-library" element={<ShowLibrary />} />
          <Route path="/community" element={<Community />} />

          {/* Connectivity */}
          <Route path="/devices" element={<Devices />} />
          <Route path="/dmx" element={<DMX />} />
          <Route path="/audio-sync" element={<AudioSync />} />

          {/* Event Sequencer */}
          <Route path="/show-schedule" element={<ShowSchedule />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/event-logs" element={<EventLogs />} />

          {/* System */}
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/remote-access" element={<RemoteAccess />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/webcam" element={<Webcam />} />
          <Route path="/firmware" element={<Firmware />} />

          {/* Footer/options */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
