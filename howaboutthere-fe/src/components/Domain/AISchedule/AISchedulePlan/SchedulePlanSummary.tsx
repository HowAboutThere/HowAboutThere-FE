type SchedulePlanSummaryProps = {
  summary: string;
};

export default function SchedulePlanSummary({ summary }: SchedulePlanSummaryProps) {
  return (
    <div className="p-4  flex flex-col gap-1 border rounded-lg border-sky-100">
      <h3 className="text-sky-900">🪄 AI 일정 요약</h3>
      <p className="leading-normal text-stone-600">{summary}</p>
    </div>
  );
}
