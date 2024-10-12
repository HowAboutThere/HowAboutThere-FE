import mocks from "@/mocks/ai-schedule-location-mock.json";

import { useForm } from "react-hook-form";

import Card from "@/components/Card/Card";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ScheduleLocationItem from "./ScheduleLocationList/ScheduleLocationItem";
import Map from "@/components/Map/Map";
import { LocationType } from "@/types/location-type";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useMultipleSelect } from "@/hooks/useMultipleSelect";

type AIScheduleLocationType = {
  locations: LocationType[];
};

export default function AIScheduleLocationCard() {
  const { toggleSelect, isItemInSelectedItems } = useMultipleSelect<LocationType>();
  const form = useForm<AIScheduleLocationType>({
    defaultValues: {
      locations: [],
    },
  });
  const locations = mocks;

  const map = useMap("ai-schedule-location-map");

  useEffect(() => {
    const { unsubscribe } = form.watch((value, { name }) => {
      if (name === "locations") {
        const latlng = value.locations?.at(-1)?.latlng;
        console.log(latlng);
        if (latlng) {
          map?.panTo({ lat: latlng.lat!, lng: latlng.lng! });
        }
      }
    });

    return () => unsubscribe();
  }, [form, map]);

  return (
    <Card title={"여행지 선택"} description={"마음에 드는 여행지를 골라주세요"}>
      <div className="flex flex-col gap-8">
        <div className=" border rounded-xl overflow-hidden">
          <Map id="ai-schedule-location-map" />
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
            <Button type="submit">다음</Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
