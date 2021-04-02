import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';

const Patch = (props) => {
  return (
    <div>
      Source
      <SelectList
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
      Destination
      <SelectList
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
      Mod Intensity
      <Slider
        min={0}
        max={127}
        parameter={props.patch.modIntensity}
        onChange={(value) =>
          props.onChange({
            source: props.patch.source,
            destination: props.patch.destination,
            modIntensity: value,
          })
        }
      />
    </div>
  );
};

export default function Patches(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div className={props.className} id='patches'>
      <span>{`${props.name}`}</span>
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
      <div />
      <Patch
        patch={parameters.patch2}
        onChange={(value, parameter) =>
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
      <div />
      <Patch
        patch={parameters.patch3}
        onChange={(value, parameter) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { patch3: value },
            })
          )
        }
      />
      <div />
      <Patch
        patch={parameters.patch4}
        onChange={(value, parameter) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { patch4: value },
            })
          )
        }
      />
    </div>
  );
}
