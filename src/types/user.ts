export type User = {
  name: string;
  email: string;
  subjects: Subject[];
  dailyGoal: number;
  _count?: { subjects: number };
};

export type UpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  dailyGoal?: number;
};

export type Subject = {
  id: string;
  name: string;
  userId: string;
  _count?: { topics: number };
};
