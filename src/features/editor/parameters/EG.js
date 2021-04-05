import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Knob, Checkbox } from '../../utils/components';

export default function EG(props) {
  const parameters_eg_1 = useSelector((state) => selectById(state, props.id1));
  const parameters_eg_2 = useSelector((state) => selectById(state, props.id2));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col items-center'>
          <h3>Attack</h3>
          <Knob
            value={parameters_eg_1.attack}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { attack: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Decay</h3>
          <Knob
            value={parameters_eg_1.decay}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { decay: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Sustain</h3>
          <Knob
            value={parameters_eg_1.sustain}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { sustain: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Release</h3>
          <Knob
            value={parameters_eg_1.release}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { release: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>EG 1 Reset</h3>
          <Checkbox
            className='rounded-md border-2 text-blue-500 mt-2 w-6 h-6'
            value={parameters_eg_1.egReset}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { egReset: value },
                })
              )
            }
          />
        </div>
      </div>
      <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col items-center'>
          <h3>Attack</h3>
          <Knob
            value={parameters_eg_2.attack}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id2,
                  changes: { attack: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Decay</h3>
          <Knob
            value={parameters_eg_2.decay}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id2,
                  changes: { decay: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Sustain</h3>
          <Knob
            value={parameters_eg_2.sustain}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id2,
                  changes: { sustain: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Release</h3>
          <Knob
            value={parameters_eg_2.release}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id2,
                  changes: { release: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>EG 2 Reset</h3>
          <Checkbox
            className='rounded-md border-2 text-blue-500 mt-2 w-6 h-6'
            value={parameters_eg_2.egReset}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id2,
                  changes: { egReset: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
}

export function VocoderEG(props) {
  const parameters_eg_1 = useSelector((state) => selectById(state, props.id1));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='-mt-1 flex flex-row justify-evenly'>
        <div className='flex flex-col items-center'>
          <h3>Attack</h3>
          <Knob
            value={parameters_eg_1.attack}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { attack: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Decay</h3>
          <Knob
            value={parameters_eg_1.decay}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { decay: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Sustain</h3>
          <Knob
            value={parameters_eg_1.sustain}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { sustain: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3>Release</h3>
          <Knob
            value={parameters_eg_1.release}
            max={127}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id1,
                  changes: { release: value },
                })
              )
            }
          />
        </div>
      </div>
      <div className='-mt-8 flex flex-col items-center'>
        <h3>EG Reset</h3>
        <Checkbox
          className='checkbox'
          value={parameters_eg_1.egReset}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id1,
                changes: { egReset: value },
              })
            )
          }
        />
      </div>
    </Card>
  );
}
