import { InventoryItems } from '../../customTypes';

/***
 * @description method to sum values and compare with a limit of 40000
 * @param newValue
 * @param items
 * @return {boolean} result is a boolean
 */
export const compareTotalValue = (newValue: string, items: InventoryItems) => {
  try {
    const totalValues = items.reduce((acc: number, current: InventoryItems[number]) => {
      return acc + Number(current.value);
    }, 0);

    if (totalValues + Number(newValue) > 40000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
