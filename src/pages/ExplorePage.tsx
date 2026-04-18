import { useState, useEffect, useMemo } from "react";
import { Search, BookOpen, Plus, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { createSubject, getSubjects } from "../services/subjectServices";
import { createTopic } from "../services/topicServices";
import Loading from "../components/Loading";
import Sidebar from "../components/layout/Sidebar";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  EXPLORE_SUBJECTS,
} from "../data/exploreSubjectsData";
import type { ExploreSubject } from "../types/exploreSubjects";

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [adding, setAdding] = useState<Set<number>>(new Set());
  const [ownedNames, setOwnedNames] = useState<Set<string>>(new Set());
  const [loadingOwned, setLoadingOwned] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadOwned = async () => {
      const data = await getSubjects();
      if (data.success) {
        setOwnedNames(
          new Set(data.data.map((s) => s.name.toLowerCase().trim())),
        );
      }
      setLoadingOwned(false);
    };
    void loadOwned();
  }, []);

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return EXPLORE_SUBJECTS.filter((s) => {
      const matchCat = activeFilter === "Todos" || s.category === activeFilter;
      const matchQ =
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, activeFilter]);

  const isOwned = (subject: ExploreSubject) =>
    ownedNames.has(subject.name.toLowerCase().trim());

  const handleAdd = async (subject: ExploreSubject) => {
    if (isOwned(subject) || adding.has(subject.id)) return;

    setAdding((prev) => new Set(prev).add(subject.id));

    try {
      // 1. Cria a matéria
      const subjectData = await createSubject(subject.name);

      if (!subjectData.success) {
        toast.error(subjectData.message || t("errors.createSubject"));
        return;
      }

      const subjectId = subjectData.data.id;

      // 2. Cria todos os tópicos em paralelo
      const topicResults = await Promise.all(
        subject.topics.map((title) => createTopic(title, subjectId)),
      );

      const failedCount = topicResults.filter((r) => !r.success).length;

      if (failedCount > 0) {
        toast.warning(
          t(
            "explore.partialTopicsWarning",
            `Matéria adicionada, mas ${failedCount} tópico(s) não foram criados.`,
          ),
        );
      } else {
        toast.success(
          t(
            "explore.addedWithTopics",
            `${subject.name} adicionada com ${subject.topics.length} tópicos!`,
          ),
        );
      }

      setOwnedNames((prev) =>
        new Set(prev).add(subject.name.toLowerCase().trim()),
      );
    } catch {
      toast.error(t("errors.createSubject"));
    } finally {
      setAdding((prev) => {
        const next = new Set(prev);
        next.delete(subject.id);
        return next;
      });
    }
  };

  if (loadingOwned) {
    return <Loading fullScreen label={t("common.loading")} />;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Sidebar />

      {/* Header */}
      <div className="mb-8 pt-12 md:p-0">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {t("explore.title", "Explorar matérias")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t(
            "explore.subtitle",
            "Encontre matérias e adicione direto à sua conta.",
          )}
        </p>
        <div className="h-1.5 w-32 bg-[#806ECD] rounded-full mt-2" />
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder={t("explore.searchPlaceholder", "Buscar matéria...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl
                     text-gray-800 placeholder:text-gray-400 text-sm
                     focus:outline-none focus:border-[#806ECD] focus:ring-2 focus:ring-[#806ECD]/10
                     transition-all duration-200"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer
              ${
                activeFilter === cat
                  ? "bg-[#806ECD] text-white border-[#806ECD]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#806ECD]/40 hover:text-[#806ECD]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 mb-4">
        {visible.length}{" "}
        {visible.length === 1
          ? t("explore.resultSingular", "matéria encontrada")
          : t("explore.resultPlural", "matérias encontradas")}
      </p>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 bg-purple-50 rounded-full mb-4">
            <Search size={24} className="text-[#806ECD]" />
          </div>
          <p className="text-gray-500 font-medium">
            {t("explore.noResults", "Nenhuma matéria encontrada")}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {t("explore.tryOther", "Tente outro termo ou categoria.")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((subject) => {
            const owned = isOwned(subject);
            const isAdding = adding.has(subject.id);
            const catColors = CATEGORY_COLORS[subject.category];

            return (
              <div
                key={subject.id}
                className={`group relative bg-white border rounded-xl p-5 shadow-sm
                             hover:shadow-md transition-all duration-300
                             ${
                               owned
                                 ? "border-[#806ECD]/40"
                                 : "border-gray-200 hover:border-[#806ECD]/50"
                             }`}
              >
                {/* Category badge + owned indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-md
                                 ${catColors.bg} ${catColors.text}`}
                  >
                    {subject.category}
                  </span>

                  {owned && (
                    <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <Check size={12} />
                      <span>{t("explore.alreadyAdded", "Na sua conta")}</span>
                    </div>
                  )}
                </div>

                {/* Icon + name + description */}
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg shrink-0 transition-colors duration-300
                      ${
                        owned
                          ? "bg-[#806ECD] text-white"
                          : "bg-purple-50 text-[#806ECD] group-hover:bg-[#806ECD] group-hover:text-white"
                      }`}
                  >
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm leading-tight transition-colors
                        ${owned ? "text-[#806ECD]" : "text-gray-800 group-hover:text-[#806ECD]"}`}
                    >
                      {subject.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {subject.description}
                    </p>
                  </div>
                </div>

                {/* Topic example badges */}
                <div className="flex flex-wrap gap-1 mt-3 mb-1">
                  {subject.topicExamples.map((ex) => (
                    <span
                      key={ex}
                      className="text-[11px] px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-full"
                    >
                      {ex}
                    </span>
                  ))}
                </div>

                {/* Topic count hint */}
                <p className="text-[11px] text-gray-400 mb-4">
                  {owned
                    ? t(
                        "explore.topicsCreated",
                        `${subject.topics.length} tópicos na sua conta`,
                      )
                    : t(
                        "explore.topicsWillBeAdded",
                        `+ ${subject.topics.length} tópicos inclusos`,
                      )}
                </p>

                {/* CTA */}
                <button
                  onClick={() => void handleAdd(subject)}
                  disabled={owned || isAdding}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4
                               font-semibold text-sm rounded-lg transition-all duration-300
                               ${
                                 owned
                                   ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                                   : isAdding
                                     ? "bg-gray-50 text-gray-400 border border-gray-200 cursor-wait"
                                     : "bg-gray-50 text-gray-600 border border-gray-100 cursor-pointer group-hover:bg-[#806ECD] group-hover:text-white group-hover:border-transparent"
                               }`}
                >
                  {isAdding ? (
                    <Loading className="py-0" label="" />
                  ) : owned ? (
                    <>
                      <Check size={15} />
                      {t("explore.added", "Adicionada")}
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      {t("explore.add", "Adicionar à conta")}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
