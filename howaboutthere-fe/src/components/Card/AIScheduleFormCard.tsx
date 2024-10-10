import { useForm } from "react-hook-form";

import Card from "./Card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { DatePickerWithRange } from "../DatePicker/DatePickerWithRange";
import { Button } from "../ui/button";

import { REGIONS } from "@/constant/region";
import { MAX_BUDGET } from "@/constant/AISchedule";
import { DateRange } from "react-day-picker";

type AIPlannerFormType = {
  budget?: number;
  schedule?: DateRange;
  region: "domestic" | "foreign";
};

export default function AIScheduleFormCard() {
  const form = useForm<AIPlannerFormType>();

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
                      <FormItem className="flex items-center space-x-2 space-y-0">
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
          <Button type="submit">다음</Button>
        </form>
      </Form>
    </Card>
  );
}
