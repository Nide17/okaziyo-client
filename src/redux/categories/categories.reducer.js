import { GET_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_FAIL, DELETE_CATEGORY, DELETE_CATEGORY_FAIL, UPDATE_CATEGORY, UPDATE_CATEGORY_FAIL, CATEGORIES_LOADING } from "./categories.types";

const INITIAL_STATE = {
  allCategories: [],
  isLoading: true
};

const categoriesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        allCategories: action.payload
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload]
      };

    case CREATE_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        allCategories: state.allCategories.map((catg) => {

          if (catg._id === action.payload.idToUpdate) {

            return {
              ...catg,
              title: action.payload.title,
              description: action.payload.description
            }

          } else return catg;
        })
      }

    case DELETE_CATEGORY:
      return {
        ...state,
        allCategories: state.allCategories.filter(catg => catg._id !== action.payload)
      }

    case CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return state;
  }
};

export default categoriesReducer;