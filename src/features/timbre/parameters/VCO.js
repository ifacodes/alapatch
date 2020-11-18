import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from '../timbreSlice.js';

export default function VCO(props) {
    const parameters = useSelector((state) => selectById(state, props.id));

    const dispatch = useDispatch();
    return (
        <div>
            <span>Current Waveform {parameters.waveform} </span>
            <button
                aria-label="Increment value"
                onClick={() =>
                    dispatch(
                        parameterUpdated({
                            id: 'vco1',
                            changes: { waveform: 'Triangle' },
                        })
                    )
                }>
                {' '}
                Set Waveform to Triangle{' '}
            </button>
            <span>Current Mod Value {parameters.mod} </span>
            <input
                type="range"
                min="0"
                max="100"
                value={parameters.mod}
                onChange={(e) =>
                    dispatch(
                        parameterUpdated({
                            id: 'vco1',
                            changes: { mod: e.target.value },
                        })
                    )
                }
            />
        </div>
    );
}
