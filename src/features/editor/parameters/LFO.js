import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import Card from '../card';
import { Select, Knob, Checkbox } from '../../utils/components';

export default function LFO(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex items-center justify-between'>
        <h3>LFO Waveform</h3>
        <Select
          className='select w-3/5'
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
      </div>
      <div className='flex items-center justify-between'>
        <h3>Key Sync</h3>
        <Select
          className='select w-3/5'
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
      </div>
      <div className='flex flex-row mb-4'>
        <div className='flex flex-col w-1/2'>
          <h3 className='self-center'>Tempo Sync</h3>
          <div className='flex flex-row items-center justify-evenly'>
            <Checkbox
              value={parameters.tempoSync}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { tempoSync: value },
                  })
                )
              }
            />
            <Select
              className='select mt-2 w-2/3'
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
        </div>
        <div className='flex flex-col items-center w-1/2 space-y-1'>
          <h3>Frequency</h3>
          <Knob
            value={parameters.frequency}
            max={127}
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
      </div>
    </Card>
  );
}
