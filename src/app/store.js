import { configureStore } from '@reduxjs/toolkit';
import timbreReducer from '../features/timbre/timbreSlice';
import parameterReducer from '../features/timbre/parameters/parameterSlice';

export default configureStore({
    reducer: {
        timbres: timbreReducer,
        parameters: parameterReducer,
    },
});
