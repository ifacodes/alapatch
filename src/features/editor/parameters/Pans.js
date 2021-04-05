import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import Card from '../card';
import { Knob } from '../../utils/components';

export default function Pans(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 1</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan1}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan1: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 2</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan2}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan2: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 3</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan3}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan3: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 4</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan4}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan4: value },
                })
              )
            }
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 5</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan5}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan5: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 6</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan6}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan6: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 7</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan7}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan7: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/4'>
          <h3>Pan 8</h3>
          <Knob
            dual={true}
            max={63}
            value={parameters.pan8}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { pan8: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
}
