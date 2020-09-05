import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SettingSelect(props) {
    const classes = useStyles();
    const [setting, updateSetting] = useState("");

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
