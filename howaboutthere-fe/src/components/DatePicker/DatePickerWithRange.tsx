import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useWindowSize } from "usehooks-ts";

type DatePickerWithRangeProps = {
  isPopover?: boolean;
};
export function DatePickerWithRange({
  className,
  isPopover,
}: DatePickerWithRangeProps & React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  return (
    <div className={cn("max-w-full grid gap-2", className)}>
      {isPopover ? (
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
            <InternalCalendar dateRange={date} onSelectChange={setDate} />
          </PopoverContent>
        </Popover>
      ) : (
        <InternalCalendar dateRange={date} onSelectChange={setDate} />
      )}
    </div>
  );
}

type InternalCalendarProps = {
  dateRange?: DateRange;
  onSelectChange: SelectRangeEventHandler;
};
function InternalCalendar({ dateRange, onSelectChange }: InternalCalendarProps) {
  const { width = 0 } = useWindowSize({});
  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={dateRange?.from}
      fromDate={new Date()}
      selected={dateRange}
      numberOfMonths={width > 640 ? 2 : 1}
      onSelect={onSelectChange}
    />
  );
}
