import arrowLeft from "@/assets/icon/arrow-left.svg";
import arrowRight from "@/assets/icon/arrow-right.svg";

import Card from "@/components/Card/Card";
import Map from "@/components/Map/Map";
import { useMap } from "@vis.gl/react-google-maps";
import { useLayoutEffect, useState } from "react";
import { getBoundFromPoints } from "@/utils/mapUtil";
import MapPin from "@/components/Map/MapPin";
import SchedulePlanSummary from "./SchedulePlanSummary";
import SchedulePlanListItem from "./SchedulePlanList/SchedulePlanListItem";
import { ActivityPlan, TransportPlan } from "@/types/plan-type";
import { Button } from "@/components/ui/button";
import { usePunnel } from "@/hooks/usePunnel";
import { useAIScheduleStore } from "@/stores/ai-schedule-store";

export type PlanType = {
  date: string;
  description: string;
  schedule: (ActivityPlan | TransportPlan)[];
}[];

export default function AISchedulePlanCard() {
  const plans = useAIScheduleStore((state) => state.plan);
  const { getFirstPunnel } = usePunnel();

  const [currentDay, setCurrentDay] = useState(0);
  const [, setCurrentPolyline] = useState<google.maps.Polyline | null>(null);

  const map = useMap("ai-schedule-plan-map");

  const onClickMain = () => {
    getFirstPunnel();
  };

  useLayoutEffect(() => {
    if (map && plans?.[currentDay]?.schedule) {
      const points = plans?.[currentDay].schedule.filter((plan) => "latlng" in plan).map((plan) => plan.latlng);
      console.log(points);
      const bounds = getBoundFromPoints(points);
      map.fitBounds(bounds);

      const polyline = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: "#ff4747",
        strokeOpacity: 0.5,
        strokeWeight: 3,
      });

      setCurrentPolyline((prevPolyline) => {
        prevPolyline?.setMap(null);
        polyline.setMap(map);
        return polyline;
      });
    }
  }, [currentDay, map, plans]);

  return (
    <Card title={"AI 여행 계획"} description={"선택한 여행지를 기반으로 완성한 일정입니다"}>
      <div className="flex flex-col gap-8">
        <div className=" border rounded-xl overflow-hidden">
          <Map id="ai-schedule-plan-map">
            {plans?.[currentDay]?.schedule?.map((plan) => {
              return "latlng" in plan ? <MapPin key={`${plan.id}`} position={plan.latlng} /> : null;
            })}
          </Map>
        </div>
        <SchedulePlanSummary summary={plans?.[currentDay]?.description || ""} />
        <article className="relative p-2 flex flex-col gap-4 items-center rounded-lg bg-sky-50 overflow-hidden">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <Button
                onClick={() => setCurrentDay((prev) => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-full p-0"
                variant="outline"
              >
                <img className="w-4 h-4 object-contain" src={arrowLeft} alt="이전" />
              </Button>
              <h2 className="text-sky-900">{currentDay + 1} 일차</h2>

              <Button
                onClick={() => setCurrentDay((prev) => Math.min((plans?.length || 1) - 1, prev + 1))}
                className="w-8 h-8  rounded-full p-0"
                variant="outline"
              >
                <img className="w-4 h-4 object-contain" src={arrowRight} alt="다음" />
              </Button>
            </div>
          </div>
          <div className="relative w-full ">
            <div className="absolute z-0 top-0 left-1/2 -translate-x-0.5 w-px h-full border border-dotted border-sky-500" />
            <div className="relative  flex flex-col items-center gap-2">
              {plans?.[currentDay]?.schedule?.map((plan) => (
                <SchedulePlanListItem key={plan.id} {...plan} />
              ))}
            </div>
          </div>
        </article>
        <Button type="button" onClick={onClickMain}>
          처음으로
        </Button>
      </div>
    </Card>
  );
}
