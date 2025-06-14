
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isLiveMode: boolean;
  currentTime: number;
  totalDuration: number;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  onLiveModeChange: (checked: boolean) => void;
}

const formatTime = (timeInSeconds: number) => {
  const totalSeconds = Math.floor(timeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((timeInSeconds - totalSeconds) * 100);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
};

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isLiveMode,
  currentTime,
  totalDuration,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onLiveModeChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Playback Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onSkipBack}>
            <SkipBack />
          </Button>
          <Button size="sm" onClick={onPlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="outline" size="sm" onClick={onSkipForward}>
            <SkipForward />
          </Button>
          <div className="ml-4 text-sm text-muted-foreground font-mono w-32">
            {formatTime(currentTime)} / {formatTime(totalDuration).split('.')[0]}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
              id="live-mode"
              checked={isLiveMode}
              onCheckedChange={onLiveModeChange}
          />
          <label
              htmlFor="live-mode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
              Live Mode
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaybackControls;
