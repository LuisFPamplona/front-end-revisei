export interface ExploreSubject {
  id: number;
  name: string;
  category: string;
  description: string;
  topicExamples: string[]; // badges visuais no card
  topics: string[];        // tópicos criados na conta junto com a matéria
}
