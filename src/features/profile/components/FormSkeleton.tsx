type FormSkeletonProps = {
  rows: number;
  tone?: "green" | "amber";
};

export default function FormSkeleton({ rows, tone = "green" }: FormSkeletonProps) {
  const color = tone === "green" ? "bg-green-100" : "bg-amber-100";

  return (
    <div className="animate-pulse space-y-4" role="status" aria-label="Loading">
      <span className="sr-only">Loading, please wait</span>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index}>
          <div className={`h-3 w-28 rounded ${color}`} />
          <div className="mt-2 h-10 w-full rounded-lg bg-slate-100" />
        </div>
      ))}
      <div className={`h-10 w-32 rounded-lg ${color}`} />
    </div>
  );
}
