import { configureStore } from '@reduxjs/toolkit';
import timbreReducer from '../features/editor/timbreSlice';
import parameterReducer from '../features/editor/parameters/parameterSlice';

export default configureStore({
  reducer: {
    timbres: timbreReducer,
    parameters: parameterReducer,
  },
});
