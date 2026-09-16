import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CampusEvent } from '../types/event';
import { initialEvents } from '../data/events';

type NewEventInput = Omit<CampusEvent, 'id' | 'isJoined'>;
type EventUpdateInput = Omit<CampusEvent, 'id' | 'isJoined'>;

interface EventsContextValue {
  events: CampusEvent[];
  toggleJoin: (id: string) => void;
  getEventById: (id: string | undefined) => CampusEvent | undefined;
  addEvent: (input: NewEventInput) => CampusEvent;
  updateEvent: (id: string, input: EventUpdateInput) => void;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  const toggleJoin = (id: string) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, isJoined: !event.isJoined } : event))
    );
  };

  const getEventById = (id: string | undefined) => {
    if (!id) return undefined;
    return events.find((event) => event.id === id);
  };

  // Creates a new local event with a fresh stable id and adds it to the list.
  const addEvent = (input: NewEventInput): CampusEvent => {
    const newEvent: CampusEvent = {
      ...input,
      id: Date.now().toString(),
      isJoined: false,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  // Updates an existing event in place, keeping its id and join status.
  const updateEvent = (id: string, input: EventUpdateInput) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...input } : event))
    );
  };

  return (
    <EventsContext.Provider value={{ events, toggleJoin, getEventById, addEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
