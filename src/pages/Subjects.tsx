import { SubjectCard } from "../components/SubjectCard";
import { useEffect, useState } from "react";
import type { Subject } from "../types/user";
import { createSubject } from "../services/subjectServices";
import { Plus, BookPlus, Search } from "lucide-react";
import SubjectDetails from "../components/SubjectDetails";
import { AddSubjectForm } from "../components/AddSubjectForm";
import Sidebar from "../components/layout/Sidebar";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";

const invalidSubject = {
  id: "0",
  name: "0",
  userId: "0",
};

const Subjects = () => {
  const [isSubjectDetailsOpen, setIsSubjectDetailsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { subjects, setSubjects } = useDashboardData();
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectDetail, setSubjectDetail] = useState<Subject>(invalidSubject); // arrumar esse state aqui pra nao precisar desse invalidSubject

  const location = useLocation();
  const navigate = useNavigate();

  const [homeSelectedTopicId, setHomeSelectedTopicId] = useState<string | null>(
    null,
  );

  const openSubjectDetails = (
    subject: Subject,
    topicId: string | null = null,
  ) => {
    setSubjectDetail(subject);
    setHomeSelectedTopicId(topicId);
    setIsSubjectDetailsOpen(true);
  };

  const closeSubjectDetails = () => {
    setIsSubjectDetailsOpen(false);
    setHomeSelectedTopicId(null);
    setSubjectDetail(invalidSubject);
  };

  const [didConsumeRouteState, setDidConsumeRouteState] = useState(false);

  useEffect(() => {
    const subjectId = location.state?.subjectId;
    const topicId = location.state?.topicId;

    if (didConsumeRouteState) return;
    if (!subjectId) return;
    if (!subjects.length) return;

    const selected = subjects.find((s) => s.id === subjectId);
    if (!selected) return;

    setSubjectDetail(selected);
    setHomeSelectedTopicId(topicId ?? null);
    setIsSubjectDetailsOpen(true);
    setDidConsumeRouteState(true);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [
    didConsumeRouteState,
    location.state,
    location.pathname,
    navigate,
    subjects,
  ]);

  const handleAddSubject = async (name: string) => {
    const data = await createSubject(name);

    if (data.success) {
      setSubjects((prev) => [...prev, data.data]);
      setIsAdding(false);
      toast.success(t("success.subjectCreated"));
      return;
    }

    toast.error(data.message || t("errors.createSubject"));
  };

  const removeSubjectFromState = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar />

      <SubjectDetails
        subject={subjectDetail}
        toggle={closeSubjectDetails}
        display={isSubjectDetailsOpen}
        homeSelectedTopicId={homeSelectedTopicId}
        clearHomeSelectedTopicId={() => setHomeSelectedTopicId(null)}
      />

      <section className="flex md:pl-64 flex-col min-h-screen">
        <main className="p-4 mb-12 md:p-10 md:pt-10 max-w-7xl w-full mx-auto">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between  gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                {t("subjects.title")}
              </h1>
              <div className="h-1.5 w-26 bg-[#806ECD] rounded-full mt-2"></div>
            </div>

            <div className="relative group w-92">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#806ECD]" />
              <input
                type="text"
                placeholder={t("subjects.searchPlaceholder")}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#806ECD]/20 focus:border-[#806ECD] w-full md:w-86 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="group h-46 w-92 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#806ECD] hover:text-[#806ECD] hover:bg-purple-50 transition-all cursor-pointer bg-white/50"
              >
                <div className="p-3 rounded-full bg-slate-100 group-hover:bg-[#806ECD] group-hover:text-white transition-all">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm">
                  {t("subjects.newSubject")}
                </span>
              </button>
            ) : (
              <div className="h-40 animate-in zoom-in-95 duration-200">
                <AddSubjectForm
                  onConfirm={handleAddSubject}
                  onCancel={() => setIsAdding(false)}
                />
              </div>
            )}

            {filteredSubjects.map((item) => (
              <SubjectCard
                key={item.id}
                subject={item}
                id={item.id}
                name={item.name}
                topicCount={item._count?.topics ?? 0}
                onOpen={(subject) => openSubjectDetails(subject, null)}
                setSubject={setSubjectDetail}
                onDelete={removeSubjectFromState}
              />
            ))}
          </div>

          {subjects.length === 0 && !isAdding && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <BookPlus className="w-12 h-12 text-[#806ECD]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {t("subjects.emptyTitle")}
              </h3>
              <p className="text-slate-500 max-w-xs mt-2">
                {t("subjects.emptyDescription")}
              </p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default Subjects;
