import { IProductState, ProductActionTypes } from "./types";

const initialState: IProductState = {
  list: [],
  response: ""
};

export const productReducer = (
  state = initialState,
  action: any
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST: {
      return {
        ...state,
        list: [...action.payload],
      };
    }
    case ProductActionTypes.PRODUCT_DELETE: {
        return {
          ...state,
          response: action.payload.message
        };
    }
    case ProductActionTypes.PRODUCT_CREATE: {
        return {
          ...state,
          response: action.payload.message
        };
    }
    default:
      return state;
  }
};
