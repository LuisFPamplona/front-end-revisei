export type User = {
  name: string;
  email: string;
  subjects: Subject[];
};

export type Subject = {
  id: string;
  name: string;
  userId: string;
  _count?: { topics: number };
};

//PASSAR O ARRAY DE TOPICS PARA O SUBJECT PARA FACILITAR MINHA VIDA NO FUTURO
