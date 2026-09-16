export type EventCategory = 'Academic' | 'Sports' | 'Cultural' | 'Workshop' | 'Social';

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  isJoined: boolean;
}
