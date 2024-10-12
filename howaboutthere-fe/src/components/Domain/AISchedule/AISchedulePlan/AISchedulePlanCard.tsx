import arrowLeft from "@/assets/icon/arrow-left.svg";
import arrowRight from "@/assets/icon/arrow-right.svg";

import mocks from "@/mocks/ai-schedule-plan-mock.json";

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

type PlanAPIResponse = {
  result: Array<{
    date: string;
    description: string;
    schedule: Array<ActivityPlan | TransportPlan>;
  }>;
};

export default function AIScheduleLocationCard() {
  const plans: PlanAPIResponse = mocks as PlanAPIResponse;
  const [currentDay, setCurrentDay] = useState(0);

  const map = useMap("ai-schedule-location-map");

  useLayoutEffect(() => {
    if (map && plans?.result[currentDay]?.schedule) {
      const points = plans.result[currentDay].schedule.filter((plan) => "latlng" in plan).map((plan) => plan.latlng);
      console.log(points);
      const bounds = getBoundFromPoints(points);
      map.fitBounds(bounds);
    }
  }, [currentDay, map, plans.result]);

  return (
    <Card title={"AI 여행 계획"} description={"선택한 여행지를 기반으로 완성한 일정입니다"}>
      <div className="flex flex-col gap-8">
        <div className=" border rounded-xl overflow-hidden">
          <Map id="ai-schedule-location-map">
            {plans?.result[currentDay]?.schedule?.map((plan) => {
              return "latlng" in plan ? (
                <MapPin key={`${plan.latlng.lat}-${plan.latlng.lng}`} position={plan.latlng} />
              ) : null;
            })}
          </Map>
        </div>
        <SchedulePlanSummary
          summary={
            "오늘은 베트남의 역사와 문화에 깊이 빠져드는 날입니다. 참 박물관에서 베트남 전쟁의 역사를 배우고, 마블마운틴의 영적인 분위기를 느낀 후, 전통 요리 클래스로 베트남 음식 문화를 직접 체험합니다. 과거와 현재가 공존하는 베트남의 다채로운 모습을 경험하는 의미 있는 하루가 될 것입니다."
          }
        />
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
                onClick={() => setCurrentDay((prev) => Math.min(plans.result.length - 1, prev + 1))}
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
              {plans?.result[currentDay]?.schedule?.map((plan) => (
                <SchedulePlanListItem key={plan.id} {...plan} />
              ))}
            </div>
          </div>
        </article>
      </div>
    </Card>
  );
}