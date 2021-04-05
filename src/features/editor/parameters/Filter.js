import React from 'react';
import Card from '../card';
import { Select, Knob } from '../../utils/components';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider } from '../../helpers/Helpers';

export default function Filter(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='-mt-2 flex items-center justify-between'>
        <h3>Filter Type</h3>
        <Select
          className='select w-4/6'
          value={parameters.filterType}
          list={[
            { value: '-24db Low Pass' },
            { value: '-12db Low Pass' },
            { value: 'Band Pass' },
            { value: 'High Pass' },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { filterType: value },
              })
            )
          }
        />
      </div>
      <div className='-mt-3 flex flex-row justify-evenly'>
        <div className='flex flex-col w-1/2'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Cutoff</h3>
            <Knob
              value={parameters.cutoff}
              max={127}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { cutoff: value },
                  })
                )
              }
            />
          </div>
          <div className='pt-3 flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Resonance</h3>
            <Knob
              value={parameters.resonance}
              max={127}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { resonance: value },
                  })
                )
              }
            />
          </div>
        </div>
        <div className='px-4'></div>
        <div className='flex flex-col w-1/2'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>
              EG Intensity
            </h3>
            <Knob
              value={parameters.egIntensity}
              dual={true}
              max={63}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { egIntensity: value },
                  })
                )
              }
            />
          </div>
          <div className='pt-3 flex flex-col items-center'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Keyboard Track
            </h3>
            <Knob
              value={parameters.keyboardTrack}
              dual={true}
              max={63}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { keyboardTrack: value },
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

export const VocoderFilter = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();
  return (
    <Card className={props.className} header={props.name}>
      <div className='-mt-3 flex flex-col justify-around'>
        <div className='flex flex-col items-center'>
          <h3>Cutoff</h3>
          <Knob
            value={parameters.cutoff}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { cutoff: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Resonance</h3>
          <Knob
            value={parameters.resonance}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { resonance: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>EF Sense</h3>
          <Knob
            value={parameters.efSense}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { efSense: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
};

export const FCMod = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();
  return (
    <Card className={props.className} header={props.name}>
      <div className='-mt-4 flex flex-col justify-around space-y-4'>
        <div className='flex flex-col items-center space-y-0.5'>
          <h3>Source</h3>
          <Select
            className='select w-full'
            value={parameters.source}
            list={[
              { value: 'Amp EG' },
              { value: 'LFO 1' },
              { value: 'LFO 2' },
              { value: 'Velocity' },
              { value: 'Keyboard Track' },
              { value: 'Pitch Bend' },
              { value: 'Mod Wheel' },
            ]}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { source: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Intensity</h3>
          <Knob
            value={parameters.intensity}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { intensity: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
};
