import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Knob } from '../../utils/components';

export default function Mixer(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card header={props.name}>
      <div className='-mt-3'>
        <div className='flex flex-col items-center'>
          <h3 className='text-lg font-semibold'>Volume 1</h3>
          <Knob
            max={127}
            value={parameters.vol1}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { vol1: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='text-lg font-semibold'>Volume 2</h3>
          <Knob
            max={127}
            value={parameters.vol2}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { vol2: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='text-lg font-semibold'>Volume 3</h3>
          <Knob
            max={127}
            value={parameters.vol3}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { vol3: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
}
