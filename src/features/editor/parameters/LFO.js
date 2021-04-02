import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList, Checkbox } from '../../helpers/Helpers';

export default function LFO(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div className={props.className}>
      <span>{`${props.name}`}</span>
      LFO Waveform
      <SelectList
        value={parameters.waveform}
        list={props.waveforms}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { waveform: value },
            })
          )
        }
      />
      Key Sync
      <SelectList
        value={parameters.keySync}
        list={[{ value: 'Off' }, { value: 'Timbre' }, { value: 'Voice' }]}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { keySync: value },
            })
          )
        }
      />
      <div className='check-list'>
        <Checkbox
          name='Tempo Sync'
          parameter={parameters.tempoSync}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { tempoSync: value },
              })
            )
          }
        />
        <SelectList
          value={parameters.syncNote}
          list={[
            { value: '1/1' },
            { value: '3/4' },
            { value: '2/3' },
            { value: '1/2' },
            { value: '3/8' },
            { value: '1/3' },
            { value: '1/4' },
            { value: '3/16' },
            { value: '1/6' },
            { value: '1/8' },
            { value: '3/32' },
            { value: '1/12' },
            { value: '1/16' },
            { value: '1/24' },
            { value: '1/32' },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { syncNote: value },
              })
            )
          }
        />
      </div>
      Frequency
      <Slider
        parameter={parameters.frequency}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { frequency: value },
            })
          )
        }
      />
    </div>
  );
}
