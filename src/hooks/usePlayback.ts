
import { useState, useRef, useEffect, useCallback } from 'react';

interface UsePlaybackProps {
  totalDuration: number;
}

export const usePlayback = ({ totalDuration }: UsePlaybackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const loop = (time: number) => {
        if (lastTimeRef.current === null) {
          lastTimeRef.current = time;
        }
        const deltaTime = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        setCurrentTime(prevTime => {
          const newTime = prevTime + deltaTime;
          if (newTime >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          
          animationFrameRef.current = requestAnimationFrame(loop);
          return newTime;
        });
      };
      animationFrameRef.current = requestAnimationFrame(loop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimeRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, totalDuration]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentTime >= totalDuration) {
          setCurrentTime(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentTime, totalDuration]);
  
  const skipToStart = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const skipToEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(totalDuration);
  }, [totalDuration]);

  return {
    currentTime,
    setCurrentTime,
    isPlaying,
    handlePlayPause,
    skipToStart,
    skipToEnd,
  };
};
