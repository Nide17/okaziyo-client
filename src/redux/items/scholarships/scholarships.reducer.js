import { GET_SCHOLARSHIPS, GET_ACTIVE_SCHOLARSHIPS, GET_ACTIVE_SCHOLARSHIPS_FAIL, GET_ARCHIVED_SCHOLARSHIPS, GET_ARCHIVED_SCHOLARSHIPS_FAIL, CREATE_SCHOLARSHIP, CREATE_SCHOLARSHIP_FAIL, DELETE_SCHOLARSHIP, DELETE_SCHOLARSHIP_FAIL, UPDATE_SCHOLARSHIP, UPDATE_SCHOLARSHIP_FAIL, SCHOLARSHIPS_LOADING, GET_SUB_CATEGORY_SCHOLARSHIPS_FAIL, GET_SUB_CATEGORY_SCHOLARSHIPS, GET_CATEGORY_SCHOLARSHIPS_FAIL, GET_CATEGORY_SCHOLARSHIPS } from "./scholarships.types";

const INITIAL_STATE = {
  allScholarships: [],
  allActiveScholarships: [],
  catScholarships: [],
  archivedScholarships: [],
  totalCatPages: [],
  subCatScholarships: [],
  totalArchivesPages: [],
  totalSubCatPages: [],
  isLoading: true
};

const scholarshipsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_SCHOLARSHIPS:
      return {
        ...state,
        isLoading: false,
        allScholarships: action.payload
      };

    case GET_ACTIVE_SCHOLARSHIPS:
      return {
        ...state,
        isLoading: false,
        allActiveScholarships: action.payload
      };

    case GET_CATEGORY_SCHOLARSHIPS:
      return {
        ...state,
        isLoading: false,
        catScholarships: action.payload.scholarships,
        totalCatPages: action.payload.totalCatPages
      };

    case GET_ARCHIVED_SCHOLARSHIPS:
      return {
        ...state,
        isLoading: false,
        archivedScholarships: action.payload.archivedScholarships,
        totalArchivesPages: action.payload.totalArchivesPages
      };

    case GET_SUB_CATEGORY_SCHOLARSHIPS:
      return {
        ...state,
        isLoading: false,
        subCatScholarships: action.payload.scholarships,
        totalSubCatPages: action.payload.totalSubCatPages
      };

    case CREATE_SCHOLARSHIP:
      return {
        ...state,
        allScholarships: [...state.allScholarships, action.payload]
      };

    case CREATE_SCHOLARSHIP_FAIL:
    case DELETE_SCHOLARSHIP_FAIL:
    case UPDATE_SCHOLARSHIP_FAIL:
    case GET_CATEGORY_SCHOLARSHIPS_FAIL:
    case GET_SUB_CATEGORY_SCHOLARSHIPS_FAIL:
    case GET_ARCHIVED_SCHOLARSHIPS_FAIL:
    case GET_ACTIVE_SCHOLARSHIPS_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_SCHOLARSHIP:
      return {
        ...state,
        allScholarships: state.allScholarships.map((scholarship) => {

          if (scholarship._id === action.payload.idToUpdate) {

            return {
              ...scholarship,
              title: action.payload.title,
              brand: action.payload.brand,
              markdown: action.payload.markdown,
              deadline: action.payload.deadline
            }

          } else return scholarship;
        })
      }

    case DELETE_SCHOLARSHIP:
      return {
        ...state,
        allScholarships: state.allScholarships.filter(scholarship => scholarship._id !== action.payload)
      }

    case SCHOLARSHIPS_LOADING:
      return {
        ...state,
        isLoading: true
      }


    default:
      return state;
  }
};

export default scholarshipsReducer;