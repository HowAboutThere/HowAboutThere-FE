import { Selectable } from "@/types/form";
import ListItem from "@/components/List/ListItem";
import { LocationType } from "@/types/location-type";

type ScheduleLocationItemType = Selectable & LocationType;

export default function ScheduleLocationItem({
  location,
  address,
  description,
  imgSrc,
  isSelected,
  onSelect,
}: ScheduleLocationItemType) {
  return (
    <ListItem isSelected={isSelected} onSelect={onSelect}>
      <div className="flex justify-between items-center gap-4">
        <div className="shrink-0 overflow-hidden  w-32 sm:w-40 md:w-48 lg:w-56">
          {imgSrc && (
            <img className="aspect-video object-cover object-center m-0" src={imgSrc} alt={`${location}-Image`} />
          )}
        </div>
        <div className="w-full min-w-0 sm:w-full flex flex-col items-end">
          <h3 className="text-sky-700 text-right">{location}</h3>
          <small className="w-full min-w-0  text-stone-400 truncate text-end">{address}</small>
          <p className="w-full min-w-0  text-stone-600 truncate text-end">{description}</p>
        </div>
      </div>
    </ListItem>
  );
}
