import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Select } from '../../utils/components';
import { Slider, Checkbox } from '../../helpers/Helpers';

export default function VCO(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className='col-span-2' header={props.name}>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>Waveform</h3>
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
        <h3 className='text-lg font-semibold text-gray-900'>{`${props.dwgsOrModTypeName}`}</h3>
        <Select
          className='select w-3/5'
          value={parameters.dwgsOrModType}
          list={props.dwgsOrModType}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { dwgsOrModType: value },
              })
            )
          }
        />
      </div>
      <div className='flex items-center justify-center'>
        <h3 className='text-lg font-semibold text-gray-900'>Waveform Mod</h3>
        <Slider
          min={0}
          max={127}
          parameter={parameters.waveMod}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { waveMod: value },
              })
            )
          }
        />
      </div>
      <div className='flex items-center justify-center'>
        <h3 className='text-lg font-semibold text-gray-900'>LFO Mod</h3>
        <Slider
          min={0}
          max={127}
          parameter={parameters.lfoMod}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { lfoMod: value },
              })
            )
          }
        />
      </div>
    </Card>
  );
}

export const AudioIn = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div className={props.className}>
      <span>{`${props.name}`}</span>
      Gate
      <Slider
        min={0}
        max={127}
        parameter={parameters.gate}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { gate: value },
            })
          )
        }
      />
      Threshold
      <Slider
        min={0}
        max={127}
        parameter={parameters.threshold}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { threshold: value },
            })
          )
        }
      />
      HPF Level
      <Slider
        min={0}
        max={127}
        parameter={parameters.hpfLevel}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { hpfLevel: value },
            })
          )
        }
      />
      <Checkbox
        name='HPF Gate'
        parameter={parameters.hpfGate}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { hpfGate: value },
            })
          )
        }
      />
    </div>
  );
};
