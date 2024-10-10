import { cn } from "@/lib/utils";
import { Selectable } from "@/types/form";
import { LiHTMLAttributes } from "react";

type ListItemType = Selectable & LiHTMLAttributes<HTMLLIElement>;

export default function ListItem({ isSelected, onSelect, ...props }: ListItemType) {
  return (
    <li
      className={cn(
        "p-2 border border-r-8 rounded-lg list-none bg-white m-0",
        isSelected && "bg-sky-100",
        !isSelected && "hover:bg-sky-50",
        props.className
      )}
      onClick={onSelect}
      {...props}
    >
      {props.children}
    </li>
  );
}
