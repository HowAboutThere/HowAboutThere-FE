import { useForm } from "react-hook-form";

import Card from "@/components/Card/Card";
import { DatePickerWithRange } from "@/components/DatePicker/DatePickerWithRange";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { DateRange } from "react-day-picker";
import { REGIONS } from "@/constant/region";
import { MAX_BUDGET } from "@/constant/AISchedule";
import { usePunnel } from "@/hooks/usePunnel";
import { useMutation } from "@tanstack/react-query";
import { postAIScheduleTheme } from "@/apis/api/ai-schedule-api";
import { useAIScheduleStore } from "@/stores/ai-schedule-store";
import { ThemeType } from "@/types/theme-type";

export type AIScheduleFormType = {
  budget: number;
  schedule: DateRange;
  region: "domestic" | "foreign";
};

export default function AIScheduleFormCard() {
  const { getNextPunnel } = usePunnel();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postAIScheduleTheme,
  });

  const setForm = useAIScheduleStore((state) => state.updateForm);
  const setThemes = useAIScheduleStore((state) => state.updateThemes);

  const form = useForm<AIScheduleFormType>({
    defaultValues: {
      budget: 0,
      schedule: { from: undefined, to: undefined },
      region: "domestic",
    },
  });
  const wonCurrency = Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

  const onClickNext = async () => {
    setForm(form.getValues());

    const result = await mutateAsync({
      startDate: form.getValues("schedule").from!.toISOString(),
      endDate: form.getValues("schedule").to!.toISOString(),
      budget: form.getValues("budget"),
      isDomestic: form.getValues("region") === "domestic",
    });
    const newTheme = result.map<ThemeType>((theme, index) => ({
      id: index,
      city: theme.region, //TODO: 추후에 region으로 변경
      travelType: theme.theme,
    }));
    setThemes(newTheme);

    getNextPunnel();
  };

  return (
    <Card title={"정보 입력"} description={"여행 일정을 만들기 위한 사전 정보를 입력하는 곳입니다."}>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name={"budget"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>예산</FormLabel>

                <div className="relative">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      max={MAX_BUDGET}
                      className={`pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </FormControl>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">원</span>
                </div>
                <FormDescription>
                  최대 <span className="underline">{wonCurrency.format(MAX_BUDGET)}</span>까지 입력 가능합니다.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"schedule"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>일정</FormLabel>
                <FormControl>
                  <DatePickerWithRange date={field.value} onDateChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"region"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>지역</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-3">
                    {REGIONS.map((region) => (
                      <FormItem key={region.value} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={region.value} />
                        </FormControl>
                        <FormLabel>{region.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={onClickNext} disabled={isPending}>
            다음
          </Button>
        </form>
      </Form>
    </Card>
  );
}
