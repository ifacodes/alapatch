import React from 'react';
import RCSlider, { createSliderWithTooltip } from 'rc-slider';
import './index.css';

const SliderWithToolTip = createSliderWithTooltip(RCSlider);

const Slider = (props) => {
    return (
        <SliderWithToolTip
            tipFormatter={(v) => `${v}`}
            min={props.min}
            max={props.max}
            value={props.parameter}
            onChange={(v) => props.onChange(v)}
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

const Checkbox = (props) => {
    return (
        <input
            type="checkbox"
            value={props.parameter}
            defaultChecked={props.parameter}
            onChange={(e) => props.onChange(e.target.checked)}
        />
    );
};

export { Slider, SelectList, Checkbox };
