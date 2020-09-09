import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: 127,
    },
}));

function SettingSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleEvent = (event, newValue) => {
        setValue(newValue);
    };

    const valuetext = (value) => {
        return `${value}`;
    };

    return (
        <div className={classes.root}>
            <Slider
                value={value}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                onChange={handleEvent}
                min={0}
                max={127}
            />
        </div>
    );
}

function NameInput(props) {
    const [name, setName] = useState("init");

    useEffect(
        (props) => {
            props.returnName(name);
        },
        [name]
    );

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <form>
            <TextField
                id="simple-filled"
                value={name}
                label="Name"
                variant="filled"
                onChange={(e) => {
                    setName(handleChange);
                }}
            />
        </form>
    );
}

function SettingSelect(props) {
    const classes = useStyles();
    const [setting, setSetting] = useState("");

    useEffect(
        {
            //here we update the sysex / or the settings object when the value changes
        },
        [setting]
    );

    const handleChange = (e) => {
        setSetting(e.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-filled">{props.name}</InputLabel>
            <Select
                labelId="simple-select-filled"
                id="simple-select-filled"
                value={setting}
                onChange={handleChange}
            >
                <MenuItem value={props.options}></MenuItem>
            </Select>
        </FormControl>
    );
}

export default {
    SettingSelect,
    SettingSlider,
    NameInput,
};
