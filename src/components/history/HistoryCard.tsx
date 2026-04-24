import type { GroupedTopics } from "../../pages/History";

interface Props {
  topics: GroupedTopics;
}

function HistoryCard({ topics }: Props) {
  const today = new Date().toLocaleDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const topicsDate = new Date(
    topics.topics[0].completedAt,
  ).toLocaleDateString();

  return (
    <div className="w-92 md:w-120 md:px-6 md:py-2 px-2 py-2 mb-3 border border-[#806ECD] rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center px-2 py-1">
        <section className="w-full">
          {topicsDate != today &&
            topicsDate != yesterday.toLocaleDateString() && (
              <div className="w-full flex justify-end px-4 pb-4 ">
                {<p className="font-medium text-slate-500">{topicsDate}</p>}
              </div>
            )}
          {topicsDate === today && (
            <div className="w-full flex justify-end px-4 pb-4 ">
              {<p className="font-medium text-slate-500">Hoje</p>}
            </div>
          )}
          {topicsDate === yesterday.toLocaleDateString() && (
            <div className="w-full flex justify-end px-4 pb-4 ">
              {<p className="font-medium text-slate-500">Ontem</p>}
            </div>
          )}
          {topics.topics.map((topic) => (
            <div className="px-3.5 py-2 border mt-1.5 border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex justify-between items-center">
              <section>
                <h1 className="uppercase text-[10px] text-purple-600 font-medium opacity-70">
                  {topic.subjectName}
                </h1>
                <div className="w-52 font-medium text-slate-600">
                  {topic.title}
                </div>
              </section>

              <div className="font-medium text-[10px]">
                <p>{new Date(topic.completedAt).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center pt-4">
            <p className="border rounded-xl py-1 px-2 text-[10px] bg-slate-200 border-slate-400 font-medium">
              {topics.topics.length} tópicos concluídos
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HistoryCard;
