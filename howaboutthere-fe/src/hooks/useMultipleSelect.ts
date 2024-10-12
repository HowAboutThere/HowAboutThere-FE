import { hasKey, isObject } from "@/utils/objectUtil";
import { Primitive } from "react-hook-form";

export const useMultipleSelect = <T>(uniqueKeyIfObject: string = "id") => {
  const toggleSelect = (selectedItems: T[], toggleItem: T) => {
    const idx = idxItemInSelectedItems(selectedItems, toggleItem);
    if (idx === -1) {
      return addItems(selectedItems, [toggleItem]);
    } else {
      return deleteItem(selectedItems, idx);
    }
  };

  const addItems = (selectedItems: T[], items: T[]) => {
    return [...selectedItems, ...items];
  };

  const deleteItem = (selectedItems: T[], index: number) => {
    return [...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)];
  };

  const idxItemInSelectedItems = (selectedItems: T[], item: T) => {
    return selectedItems.findIndex((selectedItem) => {
      // 둘 중 하나라도 객체인가?
      if (isObject(item) || isObject(selectedItem)) {
        if (hasKey(item, uniqueKeyIfObject) && hasKey(selectedItem, uniqueKeyIfObject)) {
          return (
            (selectedItem as Record<string, Primitive>)[uniqueKeyIfObject] ===
            (item as Record<string, Primitive>)[uniqueKeyIfObject]
          );
        } else {
          return false;
        }
      } //원시값인가?
      else {
        return selectedItem === item;
      }
    });
  };

  const isItemInSelectedItems = (selectedItems: T[], item: T) => {
    return idxItemInSelectedItems(selectedItems, item) !== -1;
  };

  return {
    toggleSelect,
    addItems,
    deleteItem,
    isItemInSelectedItems,
  };
};
