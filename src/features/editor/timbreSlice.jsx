import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// Étape 1 : Importer notre module d-envoi Web MIDI
import { sendMicroKorgParam } from '../../utils/midiHelper';

const timbreAdapter = createEntityAdapter({});

const timbreSlice = createSlice({
  name: 'timbre',
  initialState: timbreAdapter.getInitialState({
    ids: ['timbre1', 'timbre2', 'vocoder', 'effects', 'arpeggio'],
    entities: {
      timbre1: {
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
      timbre2: {
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
      vocoder: {
        id: 'vocoder',
        vco: 'vco5',
        audioIn: 'audioIn',
        mixer: 'mixer3',
        pitch: 'pitch3',
        filter: 'filter3',
        fcMod: 'fcMod',
        eg: 'eg5',
        eg2: 'unusedVocoder',
        amp: 'amp3',
        lfo1: 'lfo5',
        lfo2: 'lfo6',
        levels: 'levels',
        pans: 'pans',
      },
      effects: {
        id: 'effects',
        modfx: 'modfx',
        delay: 'delay',
        eq: 'eq',
        arpeggA: 'arpeggA',
        arpeggB: 'arpeggB',
      },
      arpeggio: {
        arpeggA: 'arpeggA',
        arpeggB: 'arpeggB',
      },
    },
    currentTimbre: 'timbre1',
  }),
  reducers: {
    timbreCurrentUpdate(state, action) {
      state.currentTimbre = action.payload;
    },
    timbreAdded: timbreAdapter.addOne,
    // Étape 2 : Réécrire l-action de mise à jour pour intercepter le mouvement du potentiomètre
    timbreUpdated(state, action) {
      // action.payload contient la modification sous la forme { id: "nom_du_paramètre", changes: { value: X } }
      // ou { id: "nom_du_paramètre", changes: { ... } } selon les composants du projet
      const parameterId = action.payload.id;
      const changes = action.payload.changes;
      
      // Si la modification contient une valeur numérique, on la transmet au synthétiseur physique
      if (changes && typeof changes.value !== 'undefined') {
        sendMicroKorgParam(parameterId, changes.value);
      } else if (changes && typeof changes.val !== 'undefined') {
        // Double sécurité au cas où le développeur a nommé le champ 'val' au lieu de 'value'
        sendMicroKorgParam(parameterId, changes.val);
      }
      
      // On applique ensuite le comportement d-origine pour mettre à jour l-écran
      timbreAdapter.updateOne(state, action);
    },
  },
});

export const {
  selectById,
  selectAll,
  selectEntities,
  selectIds,
} = timbreAdapter.getSelectors((state) => state.timbres);

export const {
  timbreCurrentUpdate,
  timbreAdded,
  timbreUpdated,
} = timbreSlice.actions;

export default timbreSlice.reducer;