import { GET_MULTIJOBS, GET_ONE_MULTIJOBS, GET_ONE_MULTIJOBS_FAIL, CREATE_MULTIJOBS, CREATE_MULTIJOBS_FAIL, DELETE_MULTIJOBS, DELETE_MULTIJOBS_FAIL, UPDATE_MULTIJOBS, UPDATE_MULTIJOBS_FAIL, MULTIJOBS_LOADING } from "./multijobs.types";

const INITIAL_STATE = {
  allMultijobs: [],
  oneMultijobs: '',
  isLoading: true
};

const multijobsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_MULTIJOBS:
      return {
        ...state,
        isLoading: false,
        allMultijobs: action.payload
      };

    case GET_ONE_MULTIJOBS:
      return {
        ...state,
        isLoading: false,
        oneMultijobs: action.payload
      };

    case CREATE_MULTIJOBS:
      return {
        ...state,
        allMultijobs: [...state.allMultijobs, action.payload]
      };

    case CREATE_MULTIJOBS_FAIL:
    case DELETE_MULTIJOBS_FAIL:
    case UPDATE_MULTIJOBS_FAIL:
    case GET_ONE_MULTIJOBS_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_MULTIJOBS:
      return {
        ...state,
        allMultijobs: state.allMultijobs.map((job) => {

          if (job._id === action.payload.idToUpdate) {

            return {
              ...job,
              title: action.payload.title,
              markdown: action.payload.markdown,
              deadline: action.payload.deadline
            }

          } else return job;
        })
      }

    case DELETE_MULTIJOBS:
      return {
        ...state,
        allMultijobs: state.allMultijobs.filter(multijobs => multijobs._id !== action.payload)
      }

    case MULTIJOBS_LOADING:
      return {
        ...state,
        isLoading: true
      }


    default:
      return state;
  }
};

export default multijobsReducer;