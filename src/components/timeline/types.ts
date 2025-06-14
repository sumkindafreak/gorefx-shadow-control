
export interface TimelineEvent {
  id: string;
  name: string;
  start: number; // in seconds
  duration: number; // in seconds
}

export interface Track {
  id: string;
  type: 'audio' | 'lighting' | 'effects';
  name: string;
  events: TimelineEvent[];
}
