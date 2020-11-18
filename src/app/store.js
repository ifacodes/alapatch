import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import parameterReducer from '../features/timbre/parameters/parameterSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        parameters: parameterReducer,
    },
});
