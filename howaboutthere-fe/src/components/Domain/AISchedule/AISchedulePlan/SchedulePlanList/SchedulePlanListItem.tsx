import { ActivityPlan, TransportPlan } from "@/types/plan-type";

type SchedulePlanListItemProps = ActivityPlan | TransportPlan;

export default function SchedulePlanListItem(props: SchedulePlanListItemProps) {
  switch (props.type) {
    case "activity":
      return <ActivityPlanListItem {...(props as ActivityPlan)} />;
    case "transport":
      return <TransportPlanListItem {...(props as TransportPlan)} />;
    default:
      return null;
  }
}

type ActivityPlanListItemProps = ActivityPlan;
function ActivityPlanListItem({ time, location, activity }: ActivityPlanListItemProps) {
  return (
    <article className="w-full p-4 flex flex-col gap-1.5 bg-white border border-sky-100 rounded-lg">
      <small className="text-stone-500">{time}</small>
      <h3 className="text-stone-900">{location}</h3>
      <p className="text-stone-600">{activity}</p>
    </article>
  );
}

type TransportPlanListItemProps = TransportPlan;
function TransportPlanListItem({ method, duration }: TransportPlanListItemProps) {
  return (
    <article className="p-2 flex flex-row items-center gap-2 bg-sky-100 border  border-sky-200 rounded-lg">
      <h3 className="text-sky-900">{method}</h3>
      <p className="text-sky-600">약 {duration}분</p>
    </article>
  );
}
