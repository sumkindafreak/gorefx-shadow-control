
import { Button } from '@/components/ui/button';
import { PowerOff, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
    const [audioOn, setAudioOn] = useState(true);

    return (
        <footer className="flex shrink-0 items-center justify-between gap-4 border-t bg-card/20 px-4 lg:px-6 h-14">
            <p className="text-xs text-muted-foreground">GoreFX Dashboard v0.1.0</p>
            <div className="flex items-center gap-2">
                <Button variant="destructive" size="sm" className="font-orbitron tracking-wider shadow-lg shadow-destructive/20">
                    <PowerOff className="mr-2 h-4 w-4" /> EMERGENCY STOP
                </Button>
                <Button variant="outline" size="sm">
                    <RotateCcw className="mr-2 h-4 w-4" /> System Reset
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setAudioOn(!audioOn)} aria-label="Toggle Audio Feedback">
                    {audioOn ? <Volume2 /> : <VolumeX />}
                </Button>
            </div>
        </footer>
    );
}

export default Footer;
