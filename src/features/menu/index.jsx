import React, { useRef, useState, useEffect } from 'react';
import { 
  initWebMidi, 
  changeMidiOutputPort, 
  changeMidiInputPort, 
  registerMidiLogger, 
  requestCurrentPatchDump, 
  requestAllDump,
  changeKeyboardInputPort,
  registerPatchReceiver 
} from '../../utils/midiHelper';
import { Select } from '../utils/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  parameterUpdateTab,
  parameterUpdated,
  parameterFromFile,
  parameterRefreshAll,
  selectEntities,
} from '../editor/parameters/parameterSlice'; 
import { return_store_from_file, return_file_from_store } from '../io';
import download from 'downloadjs';

export default function Menu(props) {
  const [midiOutputs, setMidiOutputs] = useState([]);
  const [midiInputs, setMidiInputs] = useState([]);
  const [activeOutId, setActiveOutId] = useState('');
  const [activeInId, setActiveInId] = useState('');
  const [midiLogs, setMidiLogs] = useState([]);
  const consoleBottomRef = useRef(null);

  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  
  const state = useSelector((state) => selectEntities(state));
  const activeTab = useSelector((state) => state.parameters.activeTab);
  const dispatch = useDispatch();
  const reader = new FileReader();
  const [activeKeyboardId, setActiveKeyboardId] = useState('');
  const [keyboardChannel, setKeyboardChannel] = useState(1);

  useEffect(() => {
    // 1. Initialisation des ports MIDI physiques au démarrage
    initWebMidi().then(midiData => {
      setMidiOutputs(midiData.outputs);
      setMidiInputs(midiData.inputs);
      if (midiData.outputs.length > 0) setActiveOutId(midiData.outputs[0].id);
      if (midiData.inputs.length > 0) setActiveInId(midiData.inputs[0].id);
    });

    // 2. Écoute active de la console d'activité noire
    registerMidiLogger((newLog) => {
      setMidiLogs((prevLogs) => {
        const updatedLogs = [...prevLogs, newLog];
        return updatedLogs.slice(-30); // Limite l'historique à 30 lignes
      });
    });

    // 3. ÉCOUTE ET MISE À JOUR AUTOMATIQUE DU SON PROVENANT DU MICROKORG
    registerPatchReceiver((rawSysExBytes) => {
      try {
        console.log('[MIDI] longueur SysEx:', rawSysExBytes.length);
        console.log(
          '[MIDI] RAW:',
          Array.from(rawSysExBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join(' ')
        );
        const parsedStoreData = return_store_from_file(rawSysExBytes);
        if (!parsedStoreData.patch.name.trim()) {
          parsedStoreData.patch.name = '------------';
        }
        console.log('[MIDI] patch décodé:', parsedStoreData.patch);
        console.log('[MIDI] entités:', Object.keys(parsedStoreData));
        // Injection explicite sous forme de tableau d'entités
        dispatch(parameterFromFile(Object.values(parsedStoreData)));
        console.log('[MIDI] Redux mis à jour');
      } catch (error) {
        console.error('[MIDI] erreur décodage/injection:', error);
      }
    });
  }, [dispatch]);
  
  // Force le défilement automatique du moniteur vers le bas
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [midiLogs]);

  const handleMidiOutChange = (e) => {
    const portId = e.target.value;
    setActiveOutId(portId);
    changeMidiOutputPort(portId);
  };

  const handleMidiInChange = (e) => {
    const portId = e.target.value;
    setActiveInId(portId);
    changeMidiInputPort(portId);
  };

  const loadFile = (f) => {
    reader.onloadend = (e) => {
      setFile(new Uint8Array(e.target.result));
    };
    reader.readAsArrayBuffer(f);
  };

  useEffect(() => {
    if (file) {
      dispatch(parameterFromFile(return_store_from_file(file)));
    }
  }, [file, dispatch]);

  useEffect(() => {
    if (state.patch.mode === 'Vocoder') {
      dispatch(parameterUpdateTab('Vocoder'));
    }
    if (state.patch.mode === 'Single' || state.patch.mode === 'Multiple') {
      dispatch(parameterUpdateTab('Timbre1'));
    }
  }, [state.patch.mode, dispatch]);

  return (

  <div className="h-screen col-span-1 flex flex-col justify-between border-solid border-r border-gray-300 bg-white px-2 py-2 text-xs">
      <div className="menu-patch-container">

      {/* 2 boutons Editor / Memory */}
      <div className="my-1 w-full">
          <label htmlFor="midi-in-select" className="text-xs font-bold text-gray-500 uppercase">MENU</label>
          <div className="flex gap-1 w-full">
            <button
              className={props.page === 'editor' ? 'btn btn-active w-1/2' : 'btn w-1/2'}
              onClick={() => props.setPage('editor')}
            >Editor
            </button>

            <button
              className={props.page === 'memory' ? 'btn btn-active w-1/2' : 'btn w-1/2'}
              onClick={() => props.setPage('memory')}
            >Memory
            </button>
          </div>
      </div>

      {/* BLOC SÉLECTEURS MIDI */}
      <div className="my-1 flex flex-col space-y-3 bg-gray-100 p-2 rounded border border-gray-300">

          <div className="flex flex-col space-y-1">
            <label htmlFor="midi-out-select" className="text-xs font-bold text-gray-500 uppercase">Out :</label>
            <select 
              id="midi-out-select"
              value={activeOutId}
              onChange={handleMidiOutChange}
              className="w-full bg-white text-sm text-gray-800 px-1 py-1 rounded border border-gray-400 focus:outline-none focus:border-indigo-500"
            >
              {midiOutputs.length === 0 ? (
                <option value="">Aucune sortie trouvée</option>
              ) : (
                midiOutputs.map(device => (
                  <option key={device.id} value={device.id}>{device.name}</option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="midi-in-select" className="text-xs font-bold text-gray-500 uppercase">In :</label>
            <select 
              id="midi-in-select"
              value={activeInId}
              onChange={handleMidiInChange}
              className="w-full bg-white text-sm text-gray-800 px-1 py-1 rounded border border-gray-400 focus:outline-none focus:border-indigo-500"
            >
              {midiInputs.length === 0 ? (
                <option value="">Aucune entrée trouvée</option>
              ) : (
                midiInputs.map(device => (
                  <option key={device.id} value={device.id}>{device.name}</option>
                ))
              )}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-2 flex flex-col space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Keyboard In :</label>
                <select
                  value={activeKeyboardId}
                  onChange={(e) => {
                  setActiveKeyboardId(e.target.value);
                  changeKeyboardInputPort(e.target.value, keyboardChannel);
                  }}
                  className="w-full bg-white text-xs px-1 py-1 rounded border border-gray-400"
                >
                  <option value="">Aucun clavier</option>
                  {midiInputs.map(device => (
                    <option key={device.id} value={device.id}>{device.name}</option>
                  ))}
                </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Channel</label>
              <select
                value={keyboardChannel}
                onChange={(e) => {
                const channel = Number(e.target.value);
                setKeyboardChannel(channel);
                changeKeyboardInputPort(activeKeyboardId, channel);
                }}
                className="w-full bg-white text-xs px-1 py-1 rounded border border-gray-400"
                >
                {Array.from({ length: 16 }, (_, i) => (
                 <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
      </div>

        {/* BLOC Patch Name */}

        <div className="patch-name">
          <label htmlFor="midi-in-select" className="text-xs font-bold text-gray-500 uppercase">PATCH NAME</label>
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Patch Name"
            type="text"
            maxLength="12"
            value={state.patch.name}
            onChange={(e) => {
              dispatch(
                parameterUpdated({
                  id: 'Patch',
                  changes: { name: e.target.value },
                })
              );
            }}
          />
        </div>

        {/* CONTENEUR DES BOUTONS D'ACTIONS */}

      <div className="my-1 w-full">
        <div className="text-xs font-bold text-gray-500 uppercase mb-1">Device Import</div>

        <div className="grid grid-cols-2 gap-1">
          <button
           disabled={props.page === 'memory'}
           className="btn bg-indigo-600 text-white hover:bg-indigo-700 w-full font-semibold"
           onClick={() => requestCurrentPatchDump()}
          >
          📥 Patch
         </button>

          <button
            disabled={props.page === 'editor'}
            className="btn bg-indigo-600 text-white hover:bg-indigo-700 w-full font-semibold"
            onClick={() => requestAllDump()}
          >
          📥 Global
          </button>
        </div>
      </div>

      {/* CONTENEUR DES BOUTONS D'ACTIONS */}

      <div className="my-1">
        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">PATCHS</div>
        <div className="grid grid-cols-3 gap-1">
          <button
            className="btn w-full"
            onClick={() => dispatch(parameterRefreshAll())}
          >New
          </button>

          <button
            className="btn w-full"
            onClick={() => fileRef.current.click()}
          >Load
          </button>

          <button
            className="btn w-full"
            onClick={() => {
              download(
                return_file_from_store(state),
                'microKORG_patch.syx',
                'application/octet-binary'
              );
            }}
          >Save
          </button>

      </div>
        <input
          className="hidden"
          type="file"
          accept=".syx"
          ref={fileRef}
          onChange={(e) => loadFile(e.target.files[0])}
        />
      </div>

      {/* liste single,multiple,vocoder */}

      <label htmlFor="midi-in-select" className="text-xs font-bold text-gray-500 uppercase">TYPE</label>

      <div className="patch-settings">
        <Select
          className="w-full select"
          value={state.patch.mode}
          list={[
            { value: 'Single' },
            { value: 'Multiple' },
            { value: 'Vocoder' },
          ]}
          onChange={(value) => {
            dispatch(
              parameterUpdated({
                id: 'patch',
                changes: { mode: value },
              })
            );
          }}
        />
      </div>
      
      </div>

      {/* Choix Timbre 1, Timbre 2, Vocoder, Arp/FX */}

      <div className="my-1 w-full">

        <label htmlFor="midi-in-select" className="text-xs font-bold text-gray-500 uppercase">TIMBRES</label>
        <div className="grid grid-cols-4 gap-1">
          <button
            disabled={state.patch.mode === 'Vocoder'}
            className={activeTab === 'Timbre1' ? 'btn btn-active w-full' : 'btn w-full'}
            onClick={() => dispatch(parameterUpdateTab('Timbre1'))}
          >Timbre1
          </button>

          <button
            disabled={state.patch.mode !== 'Multiple'}
            className={activeTab === 'Timbre2' ? 'btn btn-active w-full' : 'btn w-full'}
            onClick={() => dispatch(parameterUpdateTab('Timbre2'))}
          >Timbre2
          </button>

          <button
            disabled={state.patch.mode !== 'Vocoder'}
            className={activeTab === 'Vocoder' ? 'btn btn-active w-full' : 'btn w-full'}
            onClick={() => dispatch(parameterUpdateTab('Vocoder'))}
          >Vocoder
          </button>

          <button
            className={activeTab === 'Effects' ? 'btn btn-active w-full' : 'btn w-full'}
            onClick={() => dispatch(parameterUpdateTab('Effects'))}
          >Arp/FX
          </button>
        </div>
      </div>

      {/* LA PETITE CONSOLE DU MONITEUR MIDI HEXADÉCIMAL */}

      <label htmlFor="midi-in-select" className="text-xs font-bold text-gray-500 uppercase">CONSOLE</label>

      <div className="my-1 flex flex-col flex-grow h-32 w-full bg-black text-gray-300 font-mono text-[10px] p-2 rounded overflow-y-auto border border-gray-700 shadow-inner">
        <div className="text-gray-500 font-bold border-b border-gray-800 pb-1 mb-1 sticky top-0 bg-black uppercase tracking-wider text-[9px]">
          Moniteur MIDI Activity
        </div>
        <div className="flex-grow overflow-y-auto space-y-0.5">
          {midiLogs.length === 0 ? (
            <div className="text-gray-600 italic">Aucun flux détecté...</div>
          ) : (
            midiLogs.map((log, idx) => (
              <div key={idx} className={log.type === 'in' ? 'text-emerald-400' : 'text-cyan-400'}>{log.text}</div>
            ))
          )}
          <div ref={consoleBottomRef} /></div>
      </div>

      <div className="w-full text-center text-xl font-semibold border-t border-gray-200 pt-2">
        <span className="text-2xl pb-1">Alapatch v2</span> <br /> 
        <span className="text-xs text-gray-400 font-normal">A microKORG Patch Editor</span>
      </div>
    </div>
  );
}