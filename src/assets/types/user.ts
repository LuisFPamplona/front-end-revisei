export type User = {
  name: string;
  email: string;
  subjects: Subject[];
};

export type Subject = {
  id: string;
  name: string;
  userId: string;
};

export type Topic = {
  title: string;
};
