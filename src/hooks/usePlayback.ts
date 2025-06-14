
import { useState, useRef, useEffect, useCallback } from 'react';

interface UsePlaybackProps {
  totalDuration: number;
}

export const usePlayback = ({ totalDuration }: UsePlaybackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationFrameRef = useRef<number>();

  const animate = useCallback((lastTime: number) => {
    const time = performance.now();
    const deltaTime = (time - lastTime) / 1000;
    
    setCurrentTime(prevTime => {
      const newTime = prevTime + deltaTime;
      if (newTime >= totalDuration) {
        setIsPlaying(false);
        return totalDuration;
      }
      animationFrameRef.current = requestAnimationFrame(() => animate(performance.now()));
      return newTime;
    });

  }, [totalDuration]);

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(() => animate(performance.now()));
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, animate]);

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
