import React from 'react';
import { Knob } from '../../utils/components';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, Checkbox } from '../../helpers/Helpers';

export default function Amp(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <h3>Amp Level</h3>
      <Knob
        value={parameters.ampLevel}
        max={127}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { ampLevel: value },
            })
          )
        }
      />
      <h3>PanPot</h3>
      <Knob
        value={parameters.panpot}
        dual={true}
        max={63}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { panpot: value },
            })
          )
        }
      />
      <h3>Amp Keyboard Tracking</h3>
      <Knob
        value={parameters.ampTrack}
        dual={true}
        max={63}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { ampTrack: value },
            })
          )
        }
      />
      <Checkbox
        parameter={parameters.distortion}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { distortion: value },
            })
          )
        }
      />
    </Card>
  );
}

export const VocoderAmp = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div className={props.className}>
      <span>{`${props.name}`}</span>
      Amp Level
      <Slider
        parameter={parameters.ampLevel}
        min={0}
        max={127}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { ampLevel: value },
            })
          )
        }
      />
      Direct Level
      <Slider
        parameter={parameters.directLevel}
        min={0}
        max={127}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { directLevel: value },
            })
          )
        }
      />
      Amp Keyboard Tracking
      <Slider
        parameter={parameters.ampTrack}
        min={-63}
        max={63}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { ampTrack: value },
            })
          )
        }
      />
      <Checkbox
        name='Distortion'
        parameter={parameters.distortion}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { distortion: value },
            })
          )
        }
      />
    </div>
  );
};
