export type InventoryItems = {
  id: string;
  name: string;
  purchasePrice: string | number;
  type?: string;
  description?: string;
  photo?: string;
}[];
