import React from 'react';
import { Knob, Checkbox } from '../../utils/components';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';

export default function Amp(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row '>
        <div className='flex flex-col items-center justify-evenly w-1/2'>
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
        </div>
        <div className='flex flex-col items-center justify-evenly w-1/2'>
          <h3>Pan Pot</h3>
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
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center justify-evenly w-1/2'>
          <h3>Keyboard Track</h3>
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
        </div>
        <div className='flex flex-col items-center justify-start w-1/2'>
          <h3>Distortion</h3>
          <Checkbox
            value={parameters.distortion}
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
      </div>
    </Card>
  );
}

export const VocoderAmp = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/2'>
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
        </div>
        <div className='flex flex-col items-center w-1/2'>
          <h3>Direct Level</h3>
          <Knob
            value={parameters.directLevel}
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
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/2'>
          <h3>Keyboard Track</h3>
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
        </div>
        <div className='flex flex-col items-center w-1/2'>
          <h3>Distortion</h3>
          <Checkbox
            value={parameters.distortion}
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
      </div>
    </Card>
  );
};
