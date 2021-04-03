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
      <div className='flex flex-row justify-evenly -mt-4'>
        <div className='w-1/2'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Voice Assign
            </h3>
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
          </div>
          <div className='mt-2'>
            <h3 className='text-lg font-semibold text-gray-900'>Transpose</h3>
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
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>Tune</h3>
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
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Unison Detune
            </h3>
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
          </div>
        </div>
        <div className='px-4'></div>
        <div className='w-1/2'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Trigger Mode
            </h3>
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
          </div>
          <div className='mt-2'>
            <h3 className='text-lg font-semibold text-gray-900'>Portamento</h3>
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
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>Bend Range</h3>
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
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Vibrato Intensity
            </h3>
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
      </div>
    </Card>
  );
}
