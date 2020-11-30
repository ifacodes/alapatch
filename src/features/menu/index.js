import { useRef, useState, useEffect } from 'react';
import './menu.css';
import { SelectList } from '../helpers/Helpers';
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
    <div className='menu'>
      <div className='menu-patch-container'>
        <div className='patch-name'>
          <input
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
        <div className='patch-load'>
          <button
            className='menu-button'
            onClick={() => {
              dispatch(parameterRefreshAll());
            }}>
            New Patch
          </button>
          <button
            className='menu-button'
            onClick={() => {
              fileRef.current.click();
            }}>
            Load Patch
          </button>
          <button
            className='menu-button'
            onClick={() => {
              return_file_from_store(state);
            }}>
            Save Patch
          </button>
          <input
            type='file'
            accept='.syx'
            className='menu-file-input'
            ref={fileRef}
            onChange={(e) => {
              loadFile(e.target.files[0]);
            }}
          />
        </div>
        <div className='patch-settings'>
          <SelectList
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
