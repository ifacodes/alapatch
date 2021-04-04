import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Select, Knob } from '../../utils/components';
import { Slider } from '../../helpers/Helpers';

export default function Pitch(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row justify-evenly'>
        <div className='px-4 flex items-center justify-between w-1/2'>
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
        </div>
        <div className='px-4 flex items-center justify-between w-1/2'>
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
        </div>
      </div>
      <div className='flex flex-row'>
        <section className='w-1/3'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Transpose</h3>
            <Knob
              value={parameters.transpose}
              dual={true}
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
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Tune</h3>
            <Knob
              value={parameters.tune}
              dual={true}
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
        </section>
        <section className='w-1/3'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Unison Detune
            </h3>
            <Knob
              value={parameters.unisonDetune}
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
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Portamento</h3>
            <Knob
              value={parameters.portamento}
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
        </section>
        <section className='w-1/3'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Bend Range</h3>
            <Knob
              value={parameters.bendRange}
              dual={true}
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
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Vibrato Intensity
            </h3>
            <Knob
              value={parameters.vibratoIntensity}
              dual={true}
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
        </section>
      </div>
    </Card>
  );
}
