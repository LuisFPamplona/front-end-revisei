function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="min-w-37.5 flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
      <Icon className={`${color} w-5 h-5`} />
      <span className="text-2xl font-bold text-slate-800">{value}</span>
      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default StatCard;
