import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, Checkbox } from '../../helpers/Helpers';

export default function Amp(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div>
            <Slider
                parameter={parameters.ampLevel}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameters({
                            id: props.id,
                            changes: { ampLevel: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.panpot}
                min="-63"
                max="63"
                onChange={(value) =>
                    dispatch(
                        parameters({ id: props.id, changes: { panpot: value } })
                    )
                }
            />
            <Slider
                parameter={parameters.ampTrack}
                min="-63"
                max="63"
                onChange={(value) =>
                    dispatch(
                        parameters({
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
                            changes: { egReset: value },
                        })
                    )
                }
            />
        </div>
    );
}
