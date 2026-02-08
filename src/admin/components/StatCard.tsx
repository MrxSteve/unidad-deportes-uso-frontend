import Card from "../../shared/components/Card";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'indigo' | 'emerald' | 'amber';
}

export const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  const colorVariants = {
    indigo: "from-indigo-500 to-indigo-600 shadow-indigo-200",
    emerald: "from-emerald-500 to-emerald-600 shadow-emerald-200",
    amber: "from-amber-500 to-amber-600 shadow-amber-200"
  };

  return (
    <Card hoverable className={`border-l-4 border-${color}-500 overflow-hidden relative group`}>
      <div className="flex items-center p-2">
        <div className={`p-4 bg-linear-to-br ${colorVariants[color]} rounded-2xl shadow-lg text-white z-10 transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div className="ml-5 z-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
        </div>
      </div>
    </Card>
  );
};