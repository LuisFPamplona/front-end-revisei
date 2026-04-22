import { t } from "i18next";
import type { TopicWithSubjectName } from "../../types/topics";
import { useNavigate } from "react-router-dom";

interface FocusNowProps {
  topics: TopicWithSubjectName[];
}

function FocusNow({ topics }: FocusNowProps) {
  const navigate = useNavigate();
  return (
    <section className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
          {t("home.focusNow")}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div
              onClick={() =>
                navigate(`/subjects`, {
                  state: {
                    subjectId: topic.subjectId,
                    topicId: topic.id,
                  },
                })
              }
              key={topic.id}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#806ECD] transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#806ECD] uppercase">
                  {topic.subjectName}
                </span>
                <h3 className="text-slate-800 font-semibold">{topic.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${topic.status === "revisar" ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"}`}
                >
                  {t(`topicStatus.${topic.status}`)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 text-sm">{t("home.allCaughtUp")}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FocusNow;
