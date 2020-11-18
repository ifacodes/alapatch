import React from 'react';

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

export default { Slider, SelectList };
