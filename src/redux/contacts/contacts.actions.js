import { GET_CONTACTS, GET_CONTACTS_FAIL, ADD_CONTACT, DELETE_CONTACT, ADD_CONTACT_FAIL, DELETE_CONTACT_FAIL, REPLY_CONTACT_FAIL, CONTACTS_LOADING, REPLY_CONTACT } from "./contacts.types";
import axios from 'axios';

import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";

const axiosInstance = axios.create({
  baseURL: 'https://okaziyo-server.herokuapp.com',
});

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.
export const getContacts = () => async (dispatch, getState) => {
  await dispatch(getContactsLoading());

  try {
    await axiosInstance
      .get('/api/contacts', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_CONTACTS,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_CONTACTS_FAIL'));
    dispatch({ type: GET_CONTACTS_FAIL })
  }
};

export const sendMsg = (contactMsg) => async (dispatch) => {

  try {
    await axiosInstance
      .post('/api/contacts', contactMsg)
      .then(res =>
        dispatch({
          type: ADD_CONTACT,
          payload: res.data
        }), alert('Sent successfully!'))}
        
  catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CONTACT_FAIL'));
    dispatch({ type: ADD_CONTACT_FAIL })
  }
};

// Reply a contact
export const replyContact = (idToUpdate, reply) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/contacts/${idToUpdate}`, reply, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: REPLY_CONTACT,
          payload: reply
        }),
        alert('Replied successfully!'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'REPLY_CONTACT_FAIL'));
    dispatch({ type: REPLY_CONTACT_FAIL });
  }
}

// Delete a Contact
export const deleteContact = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Contact will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/contacts/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_CONTACT,
            payload: id
          }),
          alert('Deleted successfully!'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CONTACT_FAIL'));
    dispatch({ type: DELETE_CONTACT_FAIL })
  }
}

export const getContactsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: CONTACTS_LOADING

  }
}