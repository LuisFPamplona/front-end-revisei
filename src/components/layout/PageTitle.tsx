import { t } from "i18next";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <header className="flex justify-center md:items-start items-center flex-col gap-1">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
        {t(title)}
      </h1>
      <div className="text-slate-500 text-sm md:text-base font-medium">
        {t(subtitle)}
        <span className="text-[#806ECD] font-bold">
          <div className="h-1.5 w-22 bg-[#806ECD] rounded-full mt-2" />
        </span>
      </div>
    </header>
  );
}

export default PageTitle;
