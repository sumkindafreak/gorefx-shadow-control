
import React from 'react';

interface PlayheadProps {
  currentTime: number;
  pixelsPerSecond: number;
}

const Playhead: React.FC<PlayheadProps> = ({ currentTime, pixelsPerSecond }) => {
  const style = {
    left: `${currentTime * pixelsPerSecond}px`,
  };

  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
      style={style}
      aria-hidden="true"
    >
        <div className="absolute -top-1.5 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-background shadow-lg"></div>
    </div>
  );
};

export default Playhead;
