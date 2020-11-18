import { configureStore } from '@reduxjs/toolkit';
import parameterReducer from '../features/timbre/parameters/parameterSlice';

export default configureStore({
    reducer: {
        parameters: parameterReducer,
    },
});
