import axios from 'axios';
import { returnErrors } from '../../error/error.actions'
import {
  GET_SCHOLARSHIPS, GET_ACTIVE_SCHOLARSHIPS, GET_ACTIVE_SCHOLARSHIPS_FAIL, GET_ARCHIVED_SCHOLARSHIPS, GET_ARCHIVED_SCHOLARSHIPS_FAIL, CREATE_SCHOLARSHIP, CREATE_SCHOLARSHIP_FAIL, DELETE_SCHOLARSHIP, DELETE_SCHOLARSHIP_FAIL, UPDATE_SCHOLARSHIP, UPDATE_SCHOLARSHIP_FAIL, SCHOLARSHIPS_LOADING, GET_SUB_CATEGORY_SCHOLARSHIPS_FAIL, GET_SUB_CATEGORY_SCHOLARSHIPS, GET_CATEGORY_SCHOLARSHIPS_FAIL, GET_CATEGORY_SCHOLARSHIPS
} from "./scholarships.types";
import { tokenConfig } from '../../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'http://okaziyo-server.herokuapp.com',
});

// View all scholarships
export const getScholarships = () => async (dispatch) => {
  await dispatch(getScholarshipsLoading());

  try {
    await axiosInstance
      .get('/api/scholarships')
      .then(res =>
        dispatch({
          type: GET_SCHOLARSHIPS,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View all active scholarships
export const getActiveScholarships = () => async (dispatch) => {
  await dispatch(getScholarshipsLoading());

  try {
    await axiosInstance
      .get('/api/scholarships/activeScholarships')
      .then(res =>
        dispatch({
          type: GET_ACTIVE_SCHOLARSHIPS,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ACTIVE_SCHOLARSHIPS_FAIL'));
    dispatch({ type: GET_ACTIVE_SCHOLARSHIPS_FAIL })
  }
};

// View scholarships by category
export const getCategoryScholarships = (categoryId, pageNo) => async (dispatch) => {
  await dispatch(getScholarshipsLoading());

  try {
    await axiosInstance
      .get(`/api/scholarships/category/${categoryId}?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_CATEGORY_SCHOLARSHIPS,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_CATEGORY_SCHOLARSHIPS_FAIL'));
    dispatch({ type: GET_CATEGORY_SCHOLARSHIPS_FAIL })
  }
};

// View scholarships by sub category
export const getSubCategoryScholarships = (subCategoryId, pageNo) => async (dispatch) => {
  await dispatch(getScholarshipsLoading());

  try {
    await axiosInstance
      .get(`/api/scholarships/sub-category/${subCategoryId}?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_SUB_CATEGORY_SCHOLARSHIPS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_SUB_CATEGORY_SCHOLARSHIPS_FAIL'));
    dispatch({ type: GET_SUB_CATEGORY_SCHOLARSHIPS_FAIL })
  }
};

// View archives scholarships
export const getArchivesScholarships = (pageNo) => async (dispatch) => {
  await dispatch(getScholarshipsLoading());

  try {
    await axiosInstance
      .get(`/api/scholarships/archives?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_ARCHIVED_SCHOLARSHIPS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ARCHIVED_SCHOLARSHIPS_FAIL'));
    dispatch({ type: GET_ARCHIVED_SCHOLARSHIPS_FAIL })
  }
};


// Create Scholarship
export const createScholarship = (newScholarship) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/scholarships', newScholarship, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_SCHOLARSHIP,
          payload: res.data
        }))

      // Reload the page after category addition
      // .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_SCHOLARSHIP_FAIL'));
    dispatch({ type: CREATE_SCHOLARSHIP_FAIL })
  }
};


// Update a Scholarship
export const updateScholarship = updatedScholarship => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/scholarships/${updatedScholarship.idToUpdate}`, updatedScholarship, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_SCHOLARSHIP,
          payload: updatedScholarship
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_SCHOLARSHIP_FAIL'));
    dispatch({ type: UPDATE_SCHOLARSHIP_FAIL })
  }
}

// Delete a Scholarship
export const deleteScholarship = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Scholarship will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/scholarships/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_SCHOLARSHIP,
            payload: id
          }),
          alert('Deleting ...'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_SCHOLARSHIP_FAIL'));
    dispatch({ type: DELETE_SCHOLARSHIP_FAIL })
  }
}

export const getScholarshipsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: SCHOLARSHIPS_LOADING

  };
}
