import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../card';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Knob } from '../../utils/components';

export default function Levels(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 1</h3>
          <Knob
            max={127}
            value={parameters.level1}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level1: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 2</h3>
          <Knob
            max={127}
            value={parameters.level2}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level2: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 3</h3>
          <Knob
            max={127}
            value={parameters.level3}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level3: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 4</h3>
          <Knob
            max={127}
            value={parameters.level4}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level4: value },
                })
              )
            }
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 5</h3>
          <Knob
            max={127}
            value={parameters.level5}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level5: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 6</h3>
          <Knob
            max={127}
            value={parameters.level6}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level6: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 7</h3>
          <Knob
            max={127}
            value={parameters.level7}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level7: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Level 8</h3>
          <Knob
            max={127}
            value={parameters.level8}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { level8: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
}
