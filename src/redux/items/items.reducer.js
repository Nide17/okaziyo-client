import { GET_ITEMS, GET_ONE_ITEM, GET_ONE_ITEM_FAIL, GET_PAGINATION_ITEMS, CREATE_ITEM, CREATE_ITEM_FAIL, DELETE_ITEM, DELETE_ITEM_FAIL, UPDATE_ITEM, UPDATE_ITEM_FAIL, ITEMS_LOADING, PAGINATION_ITEMS_LOADING, GET_CATEGORY_ITEMS, GET_CATEGORY_ITEMS_FAIL, GET_SUB_CATEGORY_ITEMS, GET_SUB_CATEGORY_ITEMS_FAIL } from "./items.types";

const INITIAL_STATE = {
  allItems: [],
  oneItem: '',
  totalPages: [],
  catItems: [],
  totalCatPages: [],
  subCatItems: [],
  totalSubCatPages: [],
  isLoading: true,
  isPaginationLoading: true,
};

const itemsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_ITEMS:
      return {
        ...state,
        isLoading: false,
        allItems: action.payload
      };

    case GET_ONE_ITEM:
      return {
        ...state,
        isLoading: false,
        oneItem: action.payload
      };

    case GET_CATEGORY_ITEMS:
      return {
        ...state,
        isLoading: false,
        catItems: action.payload.items,
        totalCatPages: action.payload.totalCatPages
      };

    case GET_SUB_CATEGORY_ITEMS:
      return {
        ...state,
        isLoading: false,
        subCatItems: action.payload.items,
        totalSubCatPages: action.payload.totalSubCatPages
      };

    case GET_PAGINATION_ITEMS:
      return {
        ...state,
        isPaginationLoading: false,
        allPaginationItems: action.payload.items,
        totalPages: action.payload.totalPages
      };

    case CREATE_ITEM:
      return {
        ...state,
        allItems: [...state.allItems, action.payload]
      };

    case CREATE_ITEM_FAIL:
    case DELETE_ITEM_FAIL:
    case UPDATE_ITEM_FAIL:
    case GET_CATEGORY_ITEMS_FAIL:
    case GET_SUB_CATEGORY_ITEMS_FAIL:
    case GET_ONE_ITEM_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_ITEM:
      return {
        ...state,
        allItems: state.allItems.map((item) => {

          if (item._id === action.payload.idToUpdate) {

            return {
              ...item,
              title: action.payload.title,
              description: action.payload.description,
              brand: action.payload.brand,
              price: action.payload.price,
              contactNumber: action.payload.contactNumber
            }

          } else return item;
        })
      }

    case DELETE_ITEM:
      return {
        ...state,
        allItems: state.allItems.filter(item => item._id !== action.payload)
      }

    case ITEMS_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case PAGINATION_ITEMS_LOADING:
      return {
        ...state,
        isPaginationLoading: true
      }


    default:
      return state;
  }
};

export default itemsReducer;