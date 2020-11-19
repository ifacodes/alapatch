import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const timbreAdapter = createEntityAdapter({});

const timbreSlice = createSlice({
    name: 'timbre',
    initialState: timbreAdapter.getInitialState({
        ids: ['timbre1', 'timbre2', 'vocoder', 'effects', 'arpeggiator'],
        entities: {
            'timbre1': {
                id: 'timbre1',
                vco1: 'vco1',
                vco2: 'vco2',
                mixer: 'mixer1',
                pitch: 'pitch1',
                filter: 'filter1',
                eg1: 'eg1',
                amp: 'amp1',
                eg2: 'eg2',
                lfo1: 'lfo1',
                lfo2: 'lfo2',
                patches: 'patches1',
            },
            'timbre2': {
                id: 'timbre2',
                vco1: 'vco3',
                vco2: 'vco4',
                mixer: 'mixer2',
                pitch: 'pitch2',
                filter: 'filter2',
                eg1: 'eg3',
                amp: 'amp2',
                eg2: 'eg4',
                lfo1: 'lfo3',
                lfo2: 'lfo4',
                patches: 'patches2',
            },
        },
    }),
    reducers: {
        timbreAdded: timbreAdapter.addOne,
        timbreUpdated: timbreAdapter.updateOne,
    },
});

export const {
    selectById,
    selectAll,
    selectEntities,
    selectIds,
} = timbreAdapter.getSelectors((state) => state.timbres);

export const { timbreAdded, timbreUpdated } = timbreSlice.actions;

export default timbreSlice.reducer;
