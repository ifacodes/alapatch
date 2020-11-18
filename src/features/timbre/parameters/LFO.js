import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList, Checkbox } from '../../helpers/Helpers';

export default function LFO(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div>
            <SelectList
                value={parameters.waveform}
                list={props.waveforms}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { waveform: value },
                        })
                    )
                }
            />
            <SelectList
                value={parameters.keySync}
                list={['Off', 'Timbre', 'Voice']}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { keySync: value },
                        })
                    )
                }
            />
            <Checkbox
                parameter={parameters.tempoSync}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { tempoSync: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.frequency}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { frequency: value },
                        })
                    )
                }
            />
        </div>
    );
}
