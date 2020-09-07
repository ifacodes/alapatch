import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

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
    const [setting, updateSetting] = useState("");

    useEffect(
        {
            //here we update the sysex / or the settings object when the value changes
        },
        [setting]
    );

    const handleChange = (e) => {
        updateSetting(e.target.value);
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
    NameInput,
};
