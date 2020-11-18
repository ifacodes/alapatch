import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';

const Slider = (props) => {
    return (
        <input
            type="range"
            min="0"
            max="127"
            value={props.parameter}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );
};

export default function Mixer(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div>
            <Slider
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
            <Slider
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
            <Slider
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
