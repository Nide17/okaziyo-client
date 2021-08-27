import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { GET_CATEGORIES, GET_CATEGORIES_FAIL, CREATE_CATEGORY, CREATE_CATEGORY_FAIL, DELETE_CATEGORY, DELETE_CATEGORY_FAIL, UPDATE_CATEGORY, UPDATE_CATEGORY_FAIL, CATEGORIES_LOADING } from "./categories.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'http://okaziyo-server.herokuapp.com/',
});

// View all categories
export const getCategories = () => async (dispatch) => {
  await dispatch(getCategoriesLoading());

  try {
    await axiosInstance.get('/api/categories')
      .then(res =>
        dispatch({
          type: GET_CATEGORIES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_CATEGORIES_FAIL'));
    dispatch({ type: GET_CATEGORIES_FAIL })
  }
};

// Create category
export const createCategory = (newCategory) => async (dispatch, getState) => {

  try {
    await axiosInstance.post('/api/categories', newCategory, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_CATEGORY,
          payload: res.data
        }))

    // Reload the page after category addition
    // .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_CATEGORY_FAIL'));
    dispatch({ type: CREATE_CATEGORY_FAIL })
  }
};


// Update a category
export const updateCategory = updatedCatg => async (dispatch, getState) => {

  try {
    await axiosInstance.put(`/api/categories/${updatedCatg.idToUpdate}`, updatedCatg, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_CATEGORY,
          payload: updatedCatg
        }),
        alert('Updated Successfully!'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_CATEGORY_FAIL'));
    dispatch({ type: UPDATE_CATEGORY_FAIL });
  }
}

// Delete a category
export const deleteCategory = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This category will be deleted permanently!")) {
      await axiosInstance.delete(`/api/categories/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_CATEGORY,
            payload: id
          }),
          alert('Deleted Successfully!'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CATEGORY_FAIL'));
    dispatch({ type: DELETE_CATEGORY_FAIL });
  }
}

export const getCategoriesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: CATEGORIES_LOADING

  }
}