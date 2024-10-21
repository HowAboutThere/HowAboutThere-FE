import { useForm } from "react-hook-form";

import Card from "@/components/Card/Card";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ScheduleLocationItem from "./ScheduleLocationList/ScheduleLocationItem";
import Map from "@/components/Map/Map";
import { LocationType } from "@/types/location-type";
import { useMap } from "@vis.gl/react-google-maps";
import { useLayoutEffect } from "react";
import { useMultipleSelect } from "@/hooks/useMultipleSelect";
import { getBoundFromPoints } from "@/utils/mapUtil";
import MapPin from "@/components/Map/MapPin";
import { usePunnel } from "@/hooks/usePunnel";
import { useAIScheduleStore } from "@/stores/ai-schedule-store";
import { useMutation } from "@tanstack/react-query";
import { postAISchedulePlan } from "@/apis/api/ai-schedule-api";
import { ActivityPlan, TransportPlan } from "@/types/plan-type";
import { PlanType } from "../AISchedulePlan/AISchedulePlanCard";

type AIScheduleLocationType = {
  locations: LocationType[];
};

export default function AIScheduleLocationCard() {
  const travelInfo = useAIScheduleStore((state) => state.form);
  const setPlan = useAIScheduleStore((state) => state.updatePlan);

  const { mutate, isPending } = useMutation({
    mutationKey: ["postAISchedulePlan"],
    mutationFn: postAISchedulePlan,
    onSuccess: (data) => {
      const newPlans: PlanType = data.map((location) => ({
        date: location.day,
        description: location.summary,
        schedule: location.spots.map<ActivityPlan | TransportPlan>((spot, index) => ({
          id: index,
          type: "activity",
          time: spot.time,
          location: spot.touristSpot,
          activity: spot.activity,
          latlng: { lat: 0, lng: 0 },
        })),
      }));
      setPlan(newPlans);
    },
  });
  const { getNextPunnel } = usePunnel();

  const locations = useAIScheduleStore((state) => state.locations);
  const { toggleSelect, isItemInSelectedItems } = useMultipleSelect<LocationType>();

  const form = useForm<AIScheduleLocationType>({
    defaultValues: {
      locations: [],
    },
  });
  const selectedLocations = form.watch("locations");

  const onClickNext = () => {
    mutate({
      startDate: travelInfo.schedule.from!.toDateString(),
      endDate: travelInfo.schedule.to!.toDateString(),
      touristspots: selectedLocations.map<{ spotname: string }>((location) => ({
        spotname: location.location,
      })),
    });
    getNextPunnel();
  };

  const map = useMap("ai-schedule-location-map");

  useLayoutEffect(() => {
    map?.fitBounds(getBoundFromPoints(locations.map((location) => location.latlng)));
  }, [locations, map]);

  useLayoutEffect(() => {
    document.getAnimations().forEach((animation) => {
      animation.currentTime = 0;
    });
  }, [selectedLocations]);

  return (
    <Card title={"여행지 선택"} description={"마음에 드는 여행지를 골라주세요"}>
      <div className="flex flex-col gap-8">
        <div className=" border rounded-xl overflow-hidden">
          <Map id="ai-schedule-location-map">
            {locations.map((location) => (
              <MapPin
                key={`${location.id}`}
                position={location.latlng}
                isAnimated={isItemInSelectedItems(selectedLocations, location)}
              />
            ))}
          </Map>
        </div>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name={"locations"}
              render={({ field }) => (
                <ol className="flex flex-col w-full p-0 gap-1">
                  {locations.map((location) => (
                    <ScheduleLocationItem
                      id={location.id}
                      key={location.id}
                      location={location.location}
                      address={location.address}
                      description={location.description}
                      imgSrc={location.imgSrc}
                      isSelected={field.value && isItemInSelectedItems(field.value, location)}
                      onSelect={() => field.onChange(toggleSelect(field.value, location))}
                      latlng={location.latlng}
                    />
                  ))}
                </ol>
              )}
            ></FormField>
            <Button type="button" onClick={onClickNext} disabled={isPending}>
              다음
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
