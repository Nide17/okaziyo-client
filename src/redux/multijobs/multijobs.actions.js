import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import {
  GET_MULTIJOBS, GET_ONE_MULTIJOBS, GET_ONE_MULTIJOBS_FAIL, CREATE_MULTIJOBS, CREATE_MULTIJOBS_FAIL, DELETE_MULTIJOBS, DELETE_MULTIJOBS_FAIL, UPDATE_MULTIJOBS, UPDATE_MULTIJOBS_FAIL, MULTIJOBS_LOADING
} from "./multijobs.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'http://okaziyo-server.herokuapp.com/',
});

// View all jobs
export const getMultijobs = () => async (dispatch) => {
  await dispatch(getMultijobsLoading());

  try {
    await axiosInstance
      .get('/api/multijobs')
      .then(res =>
        dispatch({
          type: GET_MULTIJOBS,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View one multijobs
export const getOneMultijobs = (multijobsId) => async (dispatch) => {
  await dispatch(getMultijobsLoading());

  try {
    await axiosInstance
      .get(`/api/multijobs/${multijobsId}`)
      .then(res =>
        dispatch({
          type: GET_ONE_MULTIJOBS,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_MULTIJOBS_FAIL'));
    dispatch({ type: GET_ONE_MULTIJOBS_FAIL })
  }
};


// Create Multijobs
export const createMultijobs = (newMultijobs) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/multijobs', newMultijobs, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_MULTIJOBS,
          payload: res.data
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_MULTIJOBS_FAIL'));
    dispatch({ type: CREATE_MULTIJOBS_FAIL })
  }
};

// Update a Multijobs
export const updateMultijobs = updatedMultijobs => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/multijobs/${updatedMultijobs.idToUpdate}`, updatedMultijobs, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_MULTIJOBS,
          payload: updatedMultijobs
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_MULTIJOBS_FAIL'));
    dispatch({ type: UPDATE_MULTIJOBS_FAIL })
  }
}

// Delete a Multijobs
export const deleteMultijobs = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This multijobs will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/multijobs/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_MULTIJOBS,
            payload: id
          }),
          alert('Deleting ....'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_MULTIJOBS_FAIL'));
    dispatch({ type: DELETE_MULTIJOBS_FAIL })
  }
}

export const getMultijobsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: MULTIJOBS_LOADING

  };
}
