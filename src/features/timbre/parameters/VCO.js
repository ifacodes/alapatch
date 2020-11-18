import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';

const SelectList = (props) => {
    const options = props.list.map((option, index) => (
        <option value={option} key={index}>
            {option}
        </option>
    ));
    return (
        <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}>
            {options}
        </select>
    );
};

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
                            id: props.id,
                            changes: { waveform: 'Triangle' },
                        })
                    )
                }>
                Set Waveform to Triangle
            </button>
            <span>Current Mod Value {parameters.waveMod} </span>
            <input
                type="range"
                min="0"
                max="100"
                value={parameters.waveMod}
                onChange={(e) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { waveMod: e.target.value },
                        })
                    )
                }
            />
            <SelectList
                value={parameters.waveform}
                list={['Saw', 'Square', 'Triangle']}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { waveform: value },
                        })
                    )
                }
            />
        </div>
    );
}
