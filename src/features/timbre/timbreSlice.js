import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const timbreAdapter = createEntityAdapter({});

const timbreSlice = createSlice({
    name: 'timbre',
    initialState: timbreAdapter.getInitialState({
        ids: ['vco1'],
        entities: {
            vco1: {
                id: 'vco1',
                waveform: 'Saw',
                mod: 0,
            },
        },
    }),
    reducers: {
        parameterAdded: timbreAdapter.addOne,
        parameterUpdated: timbreAdapter.updateOne,
    },
});

export const {
    selectById,
    selectAll,
    selectEntities,
    selectIds,
} = timbreAdapter.getSelectors((state) => state.timbre);

export const { parameterAdded, parameterUpdated } = timbreSlice.actions;

export default timbreSlice.reducer;
