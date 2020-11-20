import React from 'react';
import RCSlider, { createSliderWithTooltip } from 'rc-slider';
import Select from 'react-select';
import './rcSelectTheme.css';

const SliderWithToolTip = createSliderWithTooltip(RCSlider);

const SelectStyle = {
    control: (provided) => ({
        ...provided,
        width: '100%',
    }),
};

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
    return (
<<<<<<< HEAD
        <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}>
            {options}
        </select>
=======
        <Select
            value={{ value: props.value }}
            options={props.list}
            getOptionLabel={(option) => `${option.value}`}
            onChange={(e) => props.onChange(e.value)}
            styles={SelectStyle}
        />
>>>>>>> v2-styling-react-select
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
