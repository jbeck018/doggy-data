import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import dogsReducer from './dogsSlice';

export default configureStore({
  reducer: {
    user: usersReducer,
    dogs: dogsReducer
  },
});


//Layout of state needed for Gloabl use:
// User --> For authentication across the app and put/post ops. THis will also start the app in the correct state
// Dogs Array --> IF user is true, we could fetch this early on, and reolad when a new one is added.
// Dog traits will be loaded from the summary page on the Click event. This should save initial loadign time. Plus,
//if the db is indexed (it is) it should allow for fast get requests.