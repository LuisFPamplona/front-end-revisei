import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSubjects } from "../services/subjectServices";
import { toast } from "react-toastify";
import { getTopics } from "../services/topicServices";
import { t } from "i18next";
import type { TopicWithSubjectName } from "../types/topics";
import type { Subject } from "../types/user";
import DashboardDataContext from "../features/dashboard/context/DashboardDataContext";
import { useLoading } from "../features/loading/hooks/useLoading";

interface Props {
  children: ReactNode;
}

export const DashboardDataProvider = ({ children }: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allTopics, setAllTopics] = useState<TopicWithSubjectName[]>([]);

  const { trackLoading } = useLoading();

  const loadDashboardData = useCallback(async () => {
    const request = async () => {
      try {
        const subjectsRes = await getSubjects();

        if (!subjectsRes.success) {
          toast.error(subjectsRes.message || t("errors.loadDashboard"));
          return;
        }

        setSubjects(subjectsRes.data);

        const topicsPromises = subjectsRes.data.map(async (subj) => {
          const res = await getTopics(subj.id);

          if (res.success && res.data) {
            return res.data.map((topic) => ({
              ...topic,
              subjectName: subj.name,
              subjectId: subj.id,
            }));
          }

          return [];
        });

        const results = await Promise.all(topicsPromises);
        setAllTopics(results.flat());
      } catch {
        toast.error(t("errors.loadDashboard"));
      }
    };

    await trackLoading(request());
  }, [trackLoading]);

  const refreshDashboardData = useCallback(async () => {
    await loadDashboardData();
  }, [loadDashboardData]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const value = useMemo(
    () => ({
      subjects,
      setSubjects,
      allTopics,
      setAllTopics,
      refreshDashboardData,
      loadDashboardData,
    }),
    [subjects, allTopics, refreshDashboardData],
  );

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
};
