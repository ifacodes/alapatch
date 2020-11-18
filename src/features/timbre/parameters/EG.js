import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, Checkbox } from '../../helpers/Helpers';

export default function EG(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div>
            <Slider
                parameter={parameters.attack}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { attack: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.decay}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { decay: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.sustain}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { sustain: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.release}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { release: value },
                        })
                    )
                }
            />
            <Checkbox
                parameter={parameters.egReset}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { egReset: !parameters.egReset },
                        })
                    )
                }
            />
        </div>
    );
}
