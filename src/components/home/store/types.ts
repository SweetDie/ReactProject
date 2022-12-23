export interface IProductItem {
  id: number;
  name: string;
  detail: string;
}

export interface IProductState {
  list: Array<IProductItem>;
  response: string;
}

export enum ProductActionTypes {
  PRODUCT_LIST = "PRODUCT_LIST",
  PRODUCT_DELETE = "PRODUCT_DELETE",
  PRODUCT_CREATE = "PRODUCT_CREATE"
}
