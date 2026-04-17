import { useTranslation } from "react-i18next";

type LoadingProps = {
  label?: string;
  className?: string;
  fullScreen?: boolean;
};

const Loading = ({
  label,
  className = "",
  fullScreen = false,
}: LoadingProps) => {
  const { t } = useTranslation();
  const wrapperClassName = fullScreen
    ? "min-h-screen w-full flex items-center justify-center"
    : "w-full flex items-center justify-center";
  const translatedLabel = label || t("common.loading");

  return (
    <div
      className={`${wrapperClassName} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={translatedLabel}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="loading-dots" aria-hidden="true">
          <span className="loading-dot loading-dot-left" />
          <span className="loading-dot loading-dot-center" />
          <span className="loading-dot loading-dot-right" />
        </div>
        <span className="text-sm font-medium text-slate-500">
          {translatedLabel}
        </span>
      </div>
    </div>
  );
};

export default Loading;
