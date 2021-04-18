import { useRef, useState, useEffect } from 'react';
import { Select } from '../utils/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  parameterUpdateTab,
  parameterUpdated,
  parameterFromFile,
  parameterRefreshAll,
  selectEntities,
} from '../editor/parameters/parameterSlice'; // probably temporarily here
import { return_store_from_file, return_file_from_store } from '../io';

export default function Menu() {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const state = useSelector((state) => selectEntities(state));
  const activeTab = useSelector((state) => state.parameters.activeTab);
  console.log(activeTab);
  const dispatch = useDispatch();
  const reader = new FileReader();
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
    <div className="col-span-1 flex flex-col justify-around border-solid border-r border-gray-300 bg-white px-4">
      <div className="menu-patch-container">
        <div className="patch-name">
          <input
            className="block w-full rounded-md rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
        <div className="my-3 flex flex-col items-center space-y-2">
          <button
            className="btn"
            onClick={() => {
              dispatch(parameterRefreshAll());
            }}
          >
            New Patch
          </button>
          <button
            className="btn"
            onClick={() => {
              fileRef.current.click();
            }}
          >
            Load Patch
          </button>
          <button
            className="btn"
            onClick={() => {
              console.log(return_file_from_store(state));
            }}
          >
            Save Patch
          </button>
          <input
            className="hidden"
            type="file"
            accept=".syx"
            ref={fileRef}
            onChange={(e) => {
              loadFile(e.target.files[0]);
            }}
          />
        </div>
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
      <div className="my-1 flex flex-col items-center space-y-2">
        <button
          disabled={state.patch.mode === 'Vocoder'}
          className={activeTab === 'Timbre1' ? `btn btn-active` : `btn`}
          onClick={() => {
            dispatch(parameterUpdateTab('Timbre1'));
          }}
        >
          Timbre 1
        </button>
        <button
          disabled={state.patch.mode !== 'Multiple'}
          className={activeTab === 'Timbre2' ? `btn btn-active` : `btn`}
          onClick={() => {
            dispatch(parameterUpdateTab('Timbre2'));
          }}
        >
          Timbre 2
        </button>
        <button
          disabled={state.patch.mode !== 'Vocoder'}
          className={activeTab === 'Vocoder' ? `btn btn-active` : `btn`}
          onClick={() => {
            dispatch(parameterUpdateTab('Vocoder'));
          }}
        >
          Vocoder
        </button>
        <button
          className={activeTab === 'Effects' ? `btn btn-active` : `btn`}
          onClick={() => {
            dispatch(parameterUpdateTab('Effects'));
          }}
        >
          Arp/FX
        </button>
      </div>
      <div className="w-full text-center text-xl font-semibold">
        <span className="text-3xl pb-6">Alapatch</span> <br /> A microKORG Patch
        Editor
      </div>
    </div>
  );
}
