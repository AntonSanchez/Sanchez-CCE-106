export type Course = {
  id: string;
  title: string;
  instructor: string;
  credits: number;
  schedule: string;
  description: string;
};

export type Student = {
  id: string;
  name: string;
  program: string;
  year: string;
  email: string;
  gpa: string;
  enrolledCourseIds: string[];
};

export const courses: Course[] = [
  {
    id: '1',
    title: 'Testing',
    instructor: 'Dr. John doe',
    credits: 3,
    schedule: 'Wed / Thu / Fri  9:00 – 10:30 AM',
    description:
      'Foundations of programming using JavaScript: variables, control flow, functions, and basic data structures.',
  },
  {
    id: '2',
    title: 'Calculus II',
    instructor: 'Dr. Smith',
    credits: 3,
    schedule: 'Mon / Tue / Wed  1:00 – 2:30 PM',
    description:
      'Integration techniques, sequences and series, and an introduction to differential equations.',
  },
  {
    id: '3',
    title: 'World History',
    instructor: 'Prof. James',
    credits: 2,
    schedule: 'Mon / Tue / Wed / Thu / Fri  11:00 – 12:00 PM',
    description:
      'A survey of major global events and movements from the 18th century to the present day.',
  },
];

export const student: Student = {
  id: '146916',
  name: 'Anton Sanchez',
  program: 'BS Information Technology',
  year: '3rd Year',
  email: 'anton.sanchez.146916@umindanao.edu',
  gpa: '2.51',
  enrolledCourseIds: ['1', '2', '3'],
};

export function findCourseById(id: string | undefined): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function findStudentById(id: string | undefined): Student | undefined {
  return id === student.id ? student : undefined;
}
