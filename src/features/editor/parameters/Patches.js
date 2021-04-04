import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import Card from '../card';
import { Select, Knob } from '../../utils/components';
import { Slider, SelectList } from '../../helpers/Helpers';

const Patch = (props) => {
  return (
    <div className='-mt-3 w-1/4'>
      <div className='flex flex-col items-center justify-between'>
        <h3>Source</h3>
        <Select
          className='select w-2/3'
          value={props.patch.source}
          list={[
            { value: 'Filter EG' },
            { value: 'Amp Eg' },
            { value: 'LFO 1' },
            { value: 'LFO 2' },
            { value: 'Velocity' },
            { value: 'Keyboard Track' },
            { value: 'Pitch Bend' },
            { value: 'Mod Wheel' },
          ]}
          onChange={(value) =>
            props.onChange({
              source: value,
              destination: props.patch.destination,
              modIntensity: props.patch.modIntensity,
            })
          }
        />
      </div>
      <div className='mt-1 flex flex-col items-center justify-between'>
        <h3>Destination</h3>
        <Select
          className='select w-2/3'
          value={props.patch.destination}
          list={[
            { value: 'Pitch' },
            { value: 'OSC 2 Tune' },
            { value: 'OSC 1 Control 1' },
            { value: 'Noise Level' },
            { value: 'Cutoff' },
            { value: 'Amp' },
            { value: 'Pan' },
            { value: 'LFO 2 Frequency' },
          ]}
          onChange={(value) =>
            props.onChange({
              source: props.patch.source,
              destination: value,
              modIntensity: props.patch.modIntensity,
            })
          }
        />
      </div>
      <div className='mt-1 flex flex-col items-center'>
        <h3>Mod Intensity</h3>
        <Knob
          max={127}
          value={props.patch.modIntensity}
          onChange={(value) =>
            props.onChange({
              source: props.patch.source,
              destination: props.patch.destination,
              modIntensity: value,
            })
          }
        />
      </div>
    </div>
  );
};

export default function Patches(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} id='patches' header={props.name}>
      <div className='flex flex-row justify-evenly'>
        <Patch
          patch={parameters.patch1}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: {
                  patch1: value,
                },
              })
            )
          }
        />
        <Patch
          patch={parameters.patch2}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: {
                  patch2: value,
                },
              })
            )
          }
        />
        <Patch
          patch={parameters.patch3}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { patch3: value },
              })
            )
          }
        />
        <Patch
          patch={parameters.patch4}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { patch4: value },
              })
            )
          }
        />
      </div>
    </Card>
  );
}
