
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isLiveMode: boolean;
  currentTime: number;
  totalDuration: number;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  onLiveModeChange: (checked: boolean) => void;
  onTotalDurationChange: (duration: number) => void;
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
  onTotalDurationChange,
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
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2">
            <Label htmlFor="show-length">Show Length (s)</Label>
            <Input
              id="show-length"
              type="number"
              value={totalDuration}
              onChange={(e) => onTotalDurationChange(Math.max(1, Number(e.target.value)))}
              className="w-24"
              min="1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="live-mode"
              checked={isLiveMode}
              onCheckedChange={onLiveModeChange}
            />
            <Label htmlFor="live-mode">
              Live Mode
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaybackControls;
