import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider } from '../../helpers/Helpers';

export default function Mixer(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div>
      <span>{`${props.name}`}</span>
      Volume 1
      <Slider
        min={0}
        max={127}
        parameter={parameters.vol1}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { vol1: value },
            })
          )
        }
      />
      Volume 2
      <Slider
        min={0}
        max={127}
        parameter={parameters.vol2}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { vol2: value },
            })
          )
        }
      />
      Volume 3
      <Slider
        min={0}
        max={127}
        parameter={parameters.vol3}
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
  );
}
