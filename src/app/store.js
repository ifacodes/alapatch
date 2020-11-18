import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import timbreReducer from '../features/timbre/timbreSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        timbre: timbreReducer,
    },
});
