export type User = {
  name: string;
  email: string;
  subjects: Subject[];
  _count?: { subjects: number };
};

export type Subject = {
  id: string;
  name: string;
  userId: string;
  _count?: { topics: number };
};
