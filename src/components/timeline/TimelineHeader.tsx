
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Lightbulb, AudioLines, Wand2, Undo } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Track } from './types';

interface TimelineHeaderProps {
    onAddTrack: (type: Track['type']) => void;
    onUndo: () => void;
    canUndo: boolean;
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({ onAddTrack, onUndo, canUndo }) => {
    return (
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Timeline: "Untitled Show"</CardTitle>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onUndo} disabled={!canUndo}>
                    <Undo className="w-4 h-4 mr-2" />
                    Undo
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Track
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onAddTrack('lighting')}>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            <span>Lighting</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddTrack('audio')}>
                            <AudioLines className="mr-2 h-4 w-4" />
                            <span>Audio</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddTrack('effects')}>
                            <Wand2 className="mr-2 h-4 w-4" />
                            <span>Effects</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
    );
}

export default TimelineHeader;
