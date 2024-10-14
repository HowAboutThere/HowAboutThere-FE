import mocks from "@/mocks/ai-schedule-location-mock.json";

import { useForm } from "react-hook-form";

import { ThemeType } from "@/types/theme-type";
import ScheduleThemeItem from "./ScheduleThemeList/ScheduleThemeItem";
import Card from "@/components/Card/Card";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { usePunnel } from "@/hooks/usePunnel";
import { useMutation } from "@tanstack/react-query";
import { getLocationInfo, getLocationPhoto, postAIScheduleLocation } from "@/apis/api/ai-schedule-api";
import { useAIScheduleStore } from "@/stores/ai-schedule-store";
import { LocationType } from "@/types/location-type";
import { useEffect } from "react";

export type AIScheduleThemeType = {
  theme: ThemeType;
};

export default function AIScheduleThemeCard() {
  const themes = useAIScheduleStore((state) => state.themes);
  const setLocations = useAIScheduleStore((state) => state.updateLocations);

  const { getNextPunnel } = usePunnel();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: postAIScheduleLocation,
  });

  const form = useForm<AIScheduleThemeType>();

  //TODO:mocks를 이용한 테스트 코드
  useEffect(() => {
    const fetchLocationInfo = async () => {
      if (!isError) return;
      const locationInfo = await Promise.all(mocks.map((location) => getLocationInfo({ placeId: location.placeId })));
      // const photos = await Promise.all(
      //   locationInfo.map((info) => getLocationPhoto({ photo_reference: info.photos[0].photo_reference }))
      // );
      const newLocation = mocks.map<LocationType>((location, index) => ({
        id: index,
        location: location.spotname,
        address: location.address,
        description: "",
        latlng: { lat: 0, lng: 0 },
        // description: locationInfo[index].editorial_summary,
        // latlng: locationInfo[index].geometry.location,
        // photo: URL.createObjectURL(photos[index]),
      }));
      setLocations(newLocation);
      getNextPunnel();
    };

    fetchLocationInfo();
  }, [getNextPunnel, isError, setLocations]);

  const onClickNext = async () => {
    console.log(form.getValues());
    try {
      const result = await mutateAsync({
        region: form.getValues("theme").city,
        thema: form.getValues("theme").travelType,
      });
      const newLocation = result.map<LocationType>((location, index) => ({
        id: index,
        location: location.spotname,
        address: location.address,
        description: "",
        latlng: { lat: 0, lng: 0 },
      }));
      setLocations(newLocation);
      getNextPunnel();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card title={"테마 선택"} description={"어떤 테마로 여행을 떠나볼까요?"}>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name={"theme"}
            render={({ field }) => (
              <ol className="flex flex-col w-full p-0 gap-1">
                {themes.map((theme) => (
                  <ScheduleThemeItem
                    key={theme.id}
                    imgSrc="https://images.unsplash.com/photo-1597246217838-bfc44d6ac746?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    isSelected={field.value && field.value.id === theme.id}
                    onSelect={() => field.onChange(theme)}
                    {...theme}
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
    </Card>
  );
}
