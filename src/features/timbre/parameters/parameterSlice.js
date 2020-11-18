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
            'pitch1': {
                id: 'pitch1',
                voiceAssign: 'Mono',
                triggerMode: 'Single',
                transpose: 0,
                tune: 0,
                unisonDetune: 0,
                portamento: 0,
                bendRange: 0,
                vibratoIntensity: 0,
            },
            'filter1': {
                id: 'filter1',
                filterType: '-24db Low Pass',
                cutoff: 0,
                resonance: 0,
                egIntensity: 0,
                keyboardTrack: 0,
            },
            'eg1': {
                id: 'eg1',
                attack: 0,
                decay: 0,
                sustain: 127,
                release: 0,
                egReset: false,
            },
            'amp1': {
                id: 'amp1',
                ampLevel: 127,
                panpot: 0,
                ampTrack: 0,
                distortion: false,
            },
            'eg2': {
                id: 'eg2',
                attack: 0,
                decay: 0,
                sustain: 127,
                release: 0,
                egReset: true,
            },
            'lfo1': {
                id: 'lfo1',
                waveform: 'Saw',
                keySync: 'Off',
                tempoSync: false,
                frequency: 0,
            },
            'lfo2': {
                id: 'lfo2',
                waveform: 'Saw',
                keySync: 'Off',
                tempoSync: false,
                frequency: 0,
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
