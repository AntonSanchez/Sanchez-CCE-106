import { CampusEvent } from '../types/event';

// Local-only mock data. No network/backend calls are made anywhere in the app.
export const initialEvents: CampusEvent[] = [
  {
    id: '1',
    title: 'Freshman Orientation Fair',
    category: 'Social',
    date: 'Sep 22, 2026',
    time: '9:00 AM',
    location: 'Main Quadrangle',
    description:
      'Meet clubs, orgs, and fellow freshmen at the annual orientation fair. Free food and giveaways for early arrivals.',
    organizer: 'Office of Student Affairs',
    isJoined: false,
  },
  {
    id: '2',
    title: 'Intro to Machine Learning Workshop',
    category: 'Workshop',
    date: 'Sep 25, 2026',
    time: '2:00 PM',
    location: 'CS Building, Room 204',
    description:
      'Hands-on workshop covering the basics of machine learning using Python. Laptops required, seats are limited.',
    organizer: 'Computer Science Department',
    isJoined: false,
  },
  {
    id: '3',
    title: 'Varsity Basketball Home Opener',
    category: 'Sports',
    date: 'Sep 27, 2026',
    time: '6:00 PM',
    location: 'University Gymnasium',
    description: 'Cheer on the home team as they open the season against our biggest rivals.',
    organizer: 'Athletics Department',
    isJoined: false,
  },
  {
    id: '4',
    title: 'Research Colloquium: Renewable Energy',
    category: 'Academic',
    date: 'Sep 29, 2026',
    time: '10:00 AM',
    location: 'Engineering Auditorium',
    description:
      'Faculty and graduate students present ongoing research on renewable energy systems and grid storage.',
    organizer: 'College of Engineering',
    isJoined: false,
  },
  {
    id: '5',
    title: 'Festival of Nations',
    category: 'Cultural',
    date: 'Oct 3, 2026',
    time: '5:30 PM',
    location: 'Student Center Grand Hall',
    description:
      'Celebrate diversity with performances, food, and exhibits from student organizations around the world.',
    organizer: 'International Students Association',
    isJoined: false,
  },
  {
    id: '6',
    title: 'Mental Health Awareness Talk',
    category: 'Academic',
    date: 'Oct 5, 2026',
    time: '1:00 PM',
    location: 'Wellness Center',
    description: 'A guest psychologist discusses practical stress management strategies for students.',
    organizer: 'Counseling Services',
    isJoined: false,
  },
];
