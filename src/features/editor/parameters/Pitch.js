import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Select } from '../../utils/components';
import { Slider } from '../../helpers/Helpers';

export default function Pitch(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col w-1/2'>
          <h3 className='text-lg font-semibold text-gray-900'>Voice Assign</h3>
          <Select
            className='select w-2/4'
            value={parameters.voiceAssign}
            list={[{ value: 'Mono' }, { value: 'Poly' }, { value: 'Unison' }]}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { voiceAssign: value },
                })
              )
            }
          />
          <h3 className='text-lg font-semibold text-gray-900'>Trigger Mode</h3>
          <Select
            className='select w-2/4'
            value={parameters.triggerMode}
            list={[{ value: 'Single' }, { value: 'Multiple' }]}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { triggerMode: value },
                })
              )
            }
          />
          <h3 className='font-normal mt-1'>Transpose</h3>
          <Slider
            parameter={parameters.transpose}
            min={-24}
            max={24}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { transpose: value },
                })
              )
            }
          />
          <h3 className='font-normal'>Tune</h3>
          <Slider
            parameter={parameters.tune}
            min={-50}
            max={50}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { tune: value },
                })
              )
            }
          />
        </div>
        <div className='w-10'></div>
        <div className='flex flex-col justify-evenly w-1/2'>
          <h3 className='font-normal mt-1'>Unison Detune</h3>
          <Slider
            parameter={parameters.unisonDetune}
            min={0}
            max={99}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { unisonDetune: value },
                })
              )
            }
          />
          <h3 className='font-normal mt-1'>Portamento</h3>
          <Slider
            parameter={parameters.portamento}
            min={0}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { portamento: value },
                })
              )
            }
          />
          <h3 className='font-normal mt-1'>Bend Range</h3>
          <Slider
            parameter={parameters.bendRange}
            min={-12}
            max={12}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { bendRange: value },
                })
              )
            }
          />
          <h3 className='font-normal mt-1'>Vibrato Intensity</h3>
          <Slider
            parameter={parameters.vibratoIntensity}
            min={-63}
            max={63}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { vibratoIntensity: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
}
