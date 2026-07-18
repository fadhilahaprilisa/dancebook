export default function StatCard({ icon: Icon, label, value, isLoading }) {
  return (
    <div className="glass-card p-5 rounded-2xl flex flex-col items-center text-center gap-2">
      <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      {isLoading ? (
        <div className="h-7 w-12 bg-surface-container-highest rounded-md animate-pulse mt-1" />
      ) : (
        <p className="text-2xl font-bold text-on-surface">{value ?? 0}</p>
      )}
      <p className="text-xs font-medium text-on-surface-variant">{label}</p>
    </div>
  );
}