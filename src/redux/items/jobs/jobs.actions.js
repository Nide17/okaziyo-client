import axios from 'axios';
import { returnErrors } from '../../error/error.actions'
import {
  GET_JOBS, CREATE_JOB, GET_ACTIVE_JOBS, GET_ACTIVE_JOBS_FAIL, GET_ARCHIVED_JOBS, GET_ARCHIVED_JOBS_FAIL, CREATE_JOB_FAIL, DELETE_JOB, DELETE_JOB_FAIL, UPDATE_JOB, UPDATE_JOB_FAIL, JOBS_LOADING, GET_CATEGORY_JOBS, GET_SUB_CATEGORY_JOBS, GET_SUB_CATEGORY_JOBS_FAIL, GET_CATEGORY_JOBS_FAIL
} from "./jobs.types";
import { tokenConfig } from '../../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'http://okaziyo-server.herokuapp.com',
});


// View all jobs
export const getJobs = () => async (dispatch) => {
  await dispatch(getJobsLoading());

  try {
    await axiosInstance
      .get('/api/jobs')
      .then(res =>
        dispatch({
          type: GET_JOBS,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View all active jobs
export const getActiveJobs = () => async (dispatch) => {
  await dispatch(getJobsLoading());

  try {
    await axiosInstance
      .get('/api/jobs/activeJobs')
      .then(res =>
        dispatch({
          type: GET_ACTIVE_JOBS,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ACTIVE_JOBS_FAIL'));
    dispatch({ type: GET_ACTIVE_JOBS_FAIL })
  }
};


// View jobs by category
export const getCategoryJobs = (categoryId, pageNo) => async (dispatch) => {
  await dispatch(getJobsLoading());

  try {
    await axiosInstance
      .get(`/api/jobs/category/${categoryId}?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_CATEGORY_JOBS,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_CATEGORY_JOBS_FAIL'));
    dispatch({ type: GET_CATEGORY_JOBS_FAIL })
  }
};

// View jobs by sub category
export const getSubCategoryJobs = (subCategoryId, pageNo) => async (dispatch) => {
  await dispatch(getJobsLoading());

  try {
    await axiosInstance
      .get(`/api/jobs/sub-category/${subCategoryId}?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_SUB_CATEGORY_JOBS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_SUB_CATEGORY_JOBS_FAIL'));
    dispatch({ type: GET_SUB_CATEGORY_JOBS_FAIL })
  }
};

// View archives jobs
export const getArchivesJobs = (pageNo) => async (dispatch) => {
  await dispatch(getJobsLoading());

  try {
    await axiosInstance
      .get(`/api/jobs/archives?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_ARCHIVED_JOBS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ARCHIVED_JOBS_FAIL'));
    dispatch({ type: GET_ARCHIVED_JOBS_FAIL })
  }
};

// Create Job
export const createJob = (newJob) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/jobs', newJob, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_JOB,
          payload: res.data
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_JOB_FAIL'));
    dispatch({ type: CREATE_JOB_FAIL })
  }
};

// Update a Job
export const updateJob = updatedJob => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/jobs/${updatedJob.idToUpdate}`, updatedJob, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_JOB,
          payload: updatedJob
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_JOB_FAIL'));
    dispatch({ type: UPDATE_JOB_FAIL })
  }
}

// Delete a Job
export const deleteJob = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This job will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/jobs/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_JOB,
            payload: id
          }),
          alert('Deleting ....'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_JOB_FAIL'));
    dispatch({ type: DELETE_JOB_FAIL })
  }
}

export const getJobsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: JOBS_LOADING

  };
}
