import { Badge } from "@/components/ui/badge";
import { ThemeType } from "@/types/theme-type";

type ScheduleThemeItemType = ThemeType & {
  imgSrc?: string;
};

export default function ScheduleThemeItem({ country, city, travelType, imgSrc }: ScheduleThemeItemType) {
  return (
    <li className="p-2 border border-r-8 rounded-lg list-none">
      <div className="flex justify-between items-center">
        <div className="overflow-hidden w-24">
          {imgSrc && (
            <img
              className="aspect-video object-cover object-center m-0"
              src={imgSrc}
              alt={`${country}-${city}-${travelType} Image`}
            />
          )}
        </div>
        <div className="flex flex-col items-end sm:flex-row sm:gap-3 sm:items-center">
          <div className="flex flex-row gap-2 items-center">
            <Badge className="rounded-full h-fit" variant="outline">
              <span>{country}</span>
            </Badge>
            <h3 className="text-sky-700">{city}</h3>
          </div>
          <h4 className="text-stone-700">{travelType}</h4>
        </div>
      </div>
    </li>
  );
}
