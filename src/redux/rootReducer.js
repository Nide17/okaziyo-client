import { combineReducers } from 'redux';

import subscribersReducer from './subscribers/subscribers.reducer';
import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import categoriesReducer from './categories/categories.reducer';
import itemsReducer from './items/items.reducer';
import contactsReducer from './contacts/contacts.reducer';
import jobsReducer from './items/jobs/jobs.reducer';
import scholarshipsReducer from './items/scholarships/scholarships.reducer';
import multijobsReducer from './multijobs/multijobs.reducer';

const rootReducer = combineReducers({ subscribersReducer, errorReducer, authReducer, categoriesReducer, itemsReducer, contactsReducer, jobsReducer, scholarshipsReducer, multijobsReducer });

export default rootReducer;