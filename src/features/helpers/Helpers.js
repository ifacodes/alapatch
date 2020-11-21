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
    <Select
      value={{ value: props.value }}
      options={props.list}
      getOptionLabel={
        props.labelFunction
          ? props.labelFunction
          : (option) => `${option.value}`
      }
      onChange={(e) => props.onChange(e.value)}
      styles={SelectStyle}
    />
  );
};

const Checkbox = (props) => {
  return (
    <div>
      <span>{`${props.name}:`}</span>
      <input
        type="checkbox"
        value={props.parameter}
        defaultChecked={props.parameter}
        onChange={(e) => props.onChange(e.target.checked)}
      />
    </div>
  );
};

export { Slider, SelectList, Checkbox };
