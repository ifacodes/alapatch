import React from 'react';
import styles from './Helpers.module.css';

const Slider = (props) => {
    return (
        <input
            className={styles.slider}
            type="range"
            min={props.min}
            max={props.max}
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
            className={styles.dropdown}
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
