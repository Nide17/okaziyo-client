import { GET_CONTACTS, GET_CONTACTS_FAIL, GET_CONTACT, ADD_CONTACT, DELETE_CONTACT, ADD_CONTACT_FAIL, DELETE_CONTACT_FAIL, CONTACTS_LOADING, REPLY_CONTACT, REPLY_CONTACT_FAIL } from "./contacts.types";

const INITIAL_STATE = {
  allContacts: [],
  isLoading: true
};

const contactsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_CONTACTS:
      return {
        ...state,
        isLoading: false,
        allContacts: action.payload
      };

    case GET_CONTACT:
      return {
        ...state,
        Onecontact: action.payload
      };

    case ADD_CONTACT:
      return {
        ...state,
        allContacts: [...state.allContacts, action.payload]
      };

    case ADD_CONTACT_FAIL:
    case DELETE_CONTACT_FAIL:
    case REPLY_CONTACT_FAIL:
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        allContacts: null,
        msg: "Failed!"
      };

    case DELETE_CONTACT:
      return {
        ...state,
        allContacts: state.allContacts.filter(contact => contact._id !== action.payload)
      }

    case REPLY_CONTACT:
      return {
        ...state,
        allContacts: state.allContacts.map((cont) => {

          if (cont._id === action.payload.idToUpdate) {

            return {
              ...cont,
              reply: action.payload.reply
            }

          } else return cont;
        })
      }


    case CONTACTS_LOADING:
      return {
        ...state,
        isLoading: true
      }


    default:
      return state;
  }
};

export default contactsReducer;
