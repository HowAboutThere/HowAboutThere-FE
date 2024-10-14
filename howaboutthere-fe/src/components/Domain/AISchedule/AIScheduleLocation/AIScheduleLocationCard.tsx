import mocks from "@/mocks/ai-schedule-location-mock.json";

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

type AIScheduleLocationType = {
  locations: LocationType[];
};

export default function AIScheduleLocationCard() {
  const { getNextPunnel } = usePunnel();

  const locations = mocks;
  const { toggleSelect, isItemInSelectedItems } = useMultipleSelect<LocationType>();

  const form = useForm<AIScheduleLocationType>({
    defaultValues: {
      locations: [],
    },
  });
  const selectedLocations = form.watch("locations");

  const onClickNext = () => {
    console.log(form.getValues());
    getNextPunnel();
  };

  const map = useMap("ai-schedule-location-map");

  useLayoutEffect(() => {
    map?.fitBounds(getBoundFromPoints(locations.result.map((location) => location.latlng)));
  }, [locations.result, map]);

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
            {locations.result.map((location) => (
              <MapPin
                key={`${location.latlng.lat}-${location.latlng.lng}`}
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
                  {locations.result.map((location) => (
                    <ScheduleLocationItem
                      id={location.id}
                      key={location.id}
                      location={location.location}
                      address={location.address}
                      description={location.description}
                      imgSrc="https://images.unsplash.com/photo-1696993545232-2b2717676c40?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      isSelected={field.value && isItemInSelectedItems(field.value, location)}
                      onSelect={() => field.onChange(toggleSelect(field.value, location))}
                      latlng={location.latlng}
                    />
                  ))}
                </ol>
              )}
            ></FormField>
            <Button type="button" onClick={onClickNext}>
              다음
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
