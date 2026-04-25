import { createContext, type Dispatch, type SetStateAction } from "react";
import type { TopicWithSubjectName } from "../../../types/topics";
import type { Subject } from "../../../types/user";

interface DashboardDataContextValue {
  subjects: Subject[];
  setSubjects: Dispatch<SetStateAction<Subject[]>>;
  allTopics: TopicWithSubjectName[];
  setAllTopics: Dispatch<SetStateAction<TopicWithSubjectName[]>>;
  refreshDashboardData: () => Promise<void>;
}

const DashboardDataContext = createContext<
  DashboardDataContextValue | undefined
>(undefined);

export default DashboardDataContext;
