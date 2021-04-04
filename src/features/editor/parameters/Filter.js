import React from 'react';
import Card from '../card';
import { Select, Knob } from '../../utils/components';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';

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
              maxValue={127}
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
              maxValue={63}
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
    <div className={props.className}>
      <span>{`${props.name}`}</span>
      Cutoff
      <Slider
        parameter={parameters.cutoff}
        min={0}
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
      Resonance
      <Slider
        parameter={parameters.resonance}
        min={0}
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
      EF Sense
      <Slider
        parameter={parameters.efSense}
        min={0}
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
  );
};

export const FCMod = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();
  return (
    <div>
      <span>{`${props.name}`}</span>
      Source
      <SelectList
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
      Intensity
      <Slider
        parameter={parameters.intensity}
        min={0}
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
  );
};
