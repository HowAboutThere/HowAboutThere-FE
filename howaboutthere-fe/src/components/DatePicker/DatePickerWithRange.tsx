import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  return (
    <div className={cn("max-w-full grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(" w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <p className=" text-ellipsis ">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "yy/MM/dd")} - {format(date.to, "yy/MM/dd")}
                  </>
                ) : (
                  format(date.from, "yy/MM/dd")
                )
              ) : (
                <span>날짜를 선택해주세요</span>
              )}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            fromDate={date?.from}
            selected={date}
            numberOfMonths={1}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
