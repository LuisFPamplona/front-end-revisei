import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSubjects } from "../services/subjectServices";
import { getTopics } from "../services/topicServices";
import type { Subject } from "../types/user";
import type { Topic, TopicWithSubjectName } from "../types/topics";

type UseDashboardDataProps = {
  t: (key: string) => string;
};

export function useDashboardData({ t }: UseDashboardDataProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allTopics, setAllTopics] = useState<TopicWithSubjectName[]>([]);

  const loadDashboardData = useCallback(async () => {
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
          }));
        }

        return [];
      });

      const results = await Promise.all(topicsPromises);
      setAllTopics(results.flat());
    } catch {
      toast.error(t("errors.loadDashboard"));
    }
  }, [t]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    subjects,
    allTopics,
    reloadDashboard: loadDashboardData,
    setSubjects,
    setAllTopics,
  };
}
