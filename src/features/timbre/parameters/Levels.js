import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider } from '../../helpers/Helpers';

export default function Levels(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div>
      <span>{`${props.name}`}</span>
      <div>
        Level 1
        <Slider
          min={0}
          max={127}
          parameter={parameters.level1}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { level1: value },
              })
            )
          }
        />
        Level 2
        <Slider
          min={0}
          max={127}
          parameter={parameters.level2}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { level2: value },
              })
            )
          }
        />
        Level 3
        <Slider
          min={0}
          max={127}
          parameter={parameters.level3}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { level3: value },
              })
            )
          }
        />
        Level 4
        <Slider
          min={0}
          max={127}
          parameter={parameters.level4}
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
      <div />
      <div>
        Level 5
        <Slider
          min={0}
          max={127}
          parameter={parameters.level5}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { level5: value },
              })
            )
          }
        />
        Level 6
        <Slider
          min={0}
          max={127}
          parameter={parameters.level6}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { level6: value },
              })
            )
          }
        />
        Level 7
        <Slider
          min={0}
          max={127}
          parameter={parameters.level7}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { level7: value },
              })
            )
          }
        />
        Level 8
        <Slider
          min={0}
          max={127}
          parameter={parameters.level8}
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
  );
}
