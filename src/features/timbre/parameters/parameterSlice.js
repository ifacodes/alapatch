import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const parametersAdapter = createEntityAdapter({});

const parametersSlice = createSlice({
    name: 'parameters',
    initialState: parametersAdapter.getInitialState({
        ids: [
            'vco1',
            'vco2',
            'mixer1',
            'timbre1',
            'filter1',
            'eg1',
            'amp1',
            'eg2',
            'lfo1',
            'lfo2',
            'patches1',
        ],
        entities: {
            'vco1': {
                id: 'vco1',
                waveform: 'Saw',
                dwgsOrModType: 0,
                waveMod: 0,
                lfoMod: 0,
            },
            'vco2': {
                id: 'vco2',
                waveform: 'Square',
                dwgsOrModType: 0,
                waveMod: 0,
                lfoMod: 0,
            },
            'mixer1': {
                id: 'mixer1',
                vol1: 127,
                vol2: 0,
                vol3: 0,
            },
            'timbre1': {
                id: 'timbre1',
            },
            'filter1': {
                id: 'filter1',
            },
            'eg1': {
                id: 'eg1',
            },
            'amp1': {
                id: 'amp1',
            },
            'eg2': {
                id: 'eg2',
            },
            'lfo1': {
                id: 'lfo1',
            },
            'lfo2': {
                id: 'lfo2',
            },
        },
    }),
    reducers: {
        parameterAdded: parametersAdapter.addOne,
        parameterUpdated: parametersAdapter.updateOne,
    },
});

export const {
    selectById,
    selectAll,
    selectEntities,
    selectIds,
} = parametersAdapter.getSelectors((state) => state.parameters);

export const { parameterAdded, parameterUpdated } = parametersSlice.actions;

export default parametersSlice.reducer;
