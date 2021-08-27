import { GET_JOBS, GET_ACTIVE_JOBS, GET_ACTIVE_JOBS_FAIL, GET_ARCHIVED_JOBS, GET_ARCHIVED_JOBS_FAIL, CREATE_JOB, CREATE_JOB_FAIL, DELETE_JOB, DELETE_JOB_FAIL, UPDATE_JOB, UPDATE_JOB_FAIL, JOBS_LOADING, GET_CATEGORY_JOBS, GET_SUB_CATEGORY_JOBS, GET_SUB_CATEGORY_JOBS_FAIL, GET_CATEGORY_JOBS_FAIL } from "./jobs.types";

const INITIAL_STATE = {
  allJobs: [],
  allActiveJobs: [],
  catJobs: [],
  archivedJobs: [],
  totalCatPages: [],
  subCatJobs: [],
  totalSubCatPages: [],
  totalArchivesPages: [],
  isLoading: true
};

const jobsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_JOBS:
      return {
        ...state,
        isLoading: false,
        allJobs: action.payload
      };

    case GET_ACTIVE_JOBS:
      return {
        ...state,
        isLoading: false,
        allActiveJobs: action.payload
      };

    case GET_CATEGORY_JOBS:
      return {
        ...state,
        isLoading: false,
        catJobs: action.payload.jobs,
        totalCatPages: action.payload.totalCatPages
      };

    case GET_ARCHIVED_JOBS:
      return {
        ...state,
        isLoading: false,
        archivedJobs: action.payload.archivedJobs,
        totalArchivesPages: action.payload.totalArchivesPages
      };

    case GET_SUB_CATEGORY_JOBS:
      return {
        ...state,
        isLoading: false,
        subCatJobs: action.payload.jobs,
        totalSubCatPages: action.payload.totalSubCatPages
      };
      
    case CREATE_JOB:
      return {
        ...state,
        allJobs: [...state.allJobs, action.payload]
      };

    case CREATE_JOB_FAIL:
    case DELETE_JOB_FAIL:
    case UPDATE_JOB_FAIL:
    case GET_CATEGORY_JOBS_FAIL:
    case GET_SUB_CATEGORY_JOBS_FAIL:
    case GET_ARCHIVED_JOBS_FAIL:
    case GET_ACTIVE_JOBS_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_JOB:
      return {
        ...state,
        allJobs: state.allJobs.map((job) => {

          if (job._id === action.payload.idToUpdate) {

            return {
              ...job,
              title: action.payload.title,
              brand: action.payload.brand,
              markdown: action.payload.markdown,
              deadline: action.payload.deadline
            }

          } else return job;
        })
      }

    case DELETE_JOB:
      return {
        ...state,
        allJobs: state.allJobs.filter(job => job._id !== action.payload)
      }

    case JOBS_LOADING:
      return {
        ...state,
        isLoading: true
      }


    default:
      return state;
  }
};

export default jobsReducer;