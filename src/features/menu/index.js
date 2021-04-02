import { useRef, useState, useEffect } from 'react';
import { Select } from '../utils/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  parameterUpdateIndex,
  parameterUpdated,
  parameterFromFile,
  parameterRefreshAll,
  selectEntities,
} from '../timbre/parameters/parameterSlice'; // probably temporarily here
import { return_store_from_file, return_file_from_store } from '../io';

export default function Menu() {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const state = useSelector((state) => selectEntities(state));
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

  return (
    <div className='flex flex-col justify-around border-solid border-r-2 border-gray-400 px-4'>
      <div className='menu-patch-container'>
        <div className='patch-name'>
          <input
            className='block w-full rounded-md bg-gray-100 border-transparent hover:bg-gray-200 focus:bg-white focus:ring-1'
            placeholder='Patch Name'
            type='text'
            maxLength='12'
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
        <div className='my-1 flex flex-col items-center'>
          <button
            className='mx-4 my-1 bg-gray-100 rounded-md w-32 h-10 border-transparent hover:bg-gray-200'
            onClick={() => {
              dispatch(parameterRefreshAll());
            }}>
            New Patch
          </button>
          <button
            className='mx-4 my-1 bg-gray-100 rounded-md w-32 h-10 border-transparent hover:bg-gray-200'
            onClick={() => {
              fileRef.current.click();
            }}>
            Load Patch
          </button>
          <button
            className='mx-4 my-1 bg-gray-100 rounded-md w-32 h-10 border-transparent hover:bg-gray-200'
            onClick={() => {
              return_file_from_store(state);
            }}>
            Save Patch
          </button>
          <input
            className='hidden'
            type='file'
            accept='.syx'
            ref={fileRef}
            onChange={(e) => {
              loadFile(e.target.files[0]);
            }}
          />
        </div>
        <div className='patch-settings'>
          <Select
            className=''
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
      <div className='menu-timbre-select'>
        <button
          disabled={state.patch.mode === 'Vocoder'}
          className='menu-button'
          onClick={() => {
            dispatch(parameterUpdateIndex(0));
          }}>
          Timbre 1
        </button>
        <button
          disabled={state.patch.mode !== 'Multiple'}
          className='menu-button'
          onClick={() => {
            dispatch(parameterUpdateIndex(1));
          }}>
          Timbre 2
        </button>
        <button
          disabled={state.patch.mode !== 'Vocoder'}
          className='menu-button'
          onClick={() => {
            dispatch(parameterUpdateIndex(2));
          }}>
          Vocoder
        </button>
        <button
          className='menu-button'
          onClick={() => {
            dispatch(parameterUpdateIndex(3));
          }}>
          Effects
        </button>
        <button
          className='menu-button'
          onClick={() => {
            dispatch(parameterUpdateIndex(4));
          }}>
          Arpeggio
        </button>
      </div>
      <div className='menu-title'>
        Alapatch <br /> A microKORG Patch Editor
      </div>
    </div>
  );
}
