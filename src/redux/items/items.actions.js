import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import {
  GET_ITEMS, GET_ONE_ITEM, GET_ONE_ITEM_FAIL, GET_PAGINATION_ITEMS, CREATE_ITEM, CREATE_ITEM_FAIL, DELETE_ITEM, DELETE_ITEM_FAIL, UPDATE_ITEM, UPDATE_ITEM_FAIL, ITEMS_LOADING, PAGINATION_ITEMS_LOADING, GET_CATEGORY_ITEMS, GET_CATEGORY_ITEMS_FAIL, GET_SUB_CATEGORY_ITEMS, GET_SUB_CATEGORY_ITEMS_FAIL
} from "./items.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'http://okaziyo-server.herokuapp.com',
});


// View all items for pagination
export const getItems = (limit) => async (dispatch) => {
  await dispatch(getItemsLoading());

  try {
    await axiosInstance
      .get(`/api/items?limit=${limit}`)
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View one item
export const getOneItem = (itemId) => async (dispatch) => {
  await dispatch(getItemsLoading());

  try {
    await axiosInstance
      .get(`/api/items/${itemId}`)
      .then(res =>
        dispatch({
          type: GET_ONE_ITEM,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_ITEM_FAIL'));
    dispatch({ type: GET_ONE_ITEM_FAIL })
  }
};

// View all items for pagination
export const getPaginationItems = (pageNo) => async (dispatch) => {
  await dispatch(getPaginationItemsLoading());

  try {
    await axiosInstance
      .get(`/api/items/pagination?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_PAGINATION_ITEMS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View items by category
export const getCategoryItems = (categoryId, pageNo) => async (dispatch) => {
  await dispatch(getItemsLoading());

  try {
    await axiosInstance
      .get(`/api/items/category/${categoryId}?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_CATEGORY_ITEMS,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_CATEGORY_ITEMS_FAIL'));
    dispatch({ type: GET_CATEGORY_ITEMS_FAIL })
  }
};

// View items by sub category
export const getSubCategoryItems = (subCategoryId, pageNo) => async (dispatch) => {
  await dispatch(getItemsLoading());

  try {
    await axiosInstance
      .get(`/api/items/sub-category/${subCategoryId}?pageNo=${pageNo}`)
      .then(res =>
        dispatch({
          type: GET_SUB_CATEGORY_ITEMS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_SUB_CATEGORY_ITEMS_FAIL'));
    dispatch({ type: GET_SUB_CATEGORY_ITEMS_FAIL })
  }
};

// Create Item
export const createItem = (newItem) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/items', newItem, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_ITEM,
          payload: res.data
        }),
        alert('Added ...'))

    // Reload the page after category addition
    // .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_ITEM_FAIL'));
    dispatch({ type: CREATE_ITEM_FAIL })
  }
};


// Update a Item
export const updateItem = updatedItem => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/items/${updatedItem.idToUpdate}`, updatedItem, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_ITEM,
          payload: updatedItem
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_ITEM_FAIL'));
    dispatch({ type: UPDATE_ITEM_FAIL })
  }
}

// Delete a Item
export const deleteItem = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This item will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_ITEM,
            payload: id
          }),
          alert('Deleting ...'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_ITEM_FAIL'));
    dispatch({ type: DELETE_ITEM_FAIL })
  }
}

export const getItemsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: ITEMS_LOADING

  };
}

export const getPaginationItemsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: PAGINATION_ITEMS_LOADING

  };
}