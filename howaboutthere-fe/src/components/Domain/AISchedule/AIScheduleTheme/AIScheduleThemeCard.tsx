import mocks from "@/mocks/ai-schedule-theme-mock.json";

import { useForm } from "react-hook-form";

import { ThemeType } from "@/types/theme-type";
import ScheduleThemeItem from "./ScheduleThemeList/ScheduleThemeItem";
import Card from "@/components/Card/Card";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { usePunnel } from "@/hooks/usePunnel";

type AIScheduleThemeType = {
  theme: ThemeType;
};

export default function AIScheduleThemeCard() {
  const { getNextPunnel } = usePunnel();

  const form = useForm<AIScheduleThemeType>();
  const themes = mocks;

  const onClickNext = () => {
    console.log(form.getValues());
    getNextPunnel();
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
                {themes.result.map((theme) => (
                  <ScheduleThemeItem
                    key={theme.country}
                    imgSrc="https://images.unsplash.com/photo-1597246217838-bfc44d6ac746?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    isSelected={field.value && field.value.country === theme.country}
                    onSelect={() => field.onChange(theme)}
                    {...theme}
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
    </Card>
  );
}
