import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';

export default function Filter(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div>
            <SelectList
                value={parameters.filterType}
                list={[
                    '-24db Low Pass',
                    '-12db Low Pass',
                    'Band Pass',
                    'High Pass',
                ]}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { filterType: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.cutoff}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { cutoff: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.resonance}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { resonance: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.egIntensity}
                min="-63"
                max="63"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { egIntensity: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.keyboardTrack}
                min="-63"
                max="63"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { keyboardTrack: value },
                        })
                    )
                }
            />
        </div>
    );
}
