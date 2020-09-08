import React from "react";
import { NameInput } from "./InputComponents.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { deepPurple } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[400],
        },
        secondary: {},
    },
});

function EditorComponent(props) {
    const patch = props.patch;

    if (!props.show) {
        return null;
    }

    return (
        // placeholder div
        <ThemeProvider theme={theme}>
            <Box bgcolor="primary">
                <NameInput
                    returnName={(name) => {
                        let copyPatch = JSON.parse(JSON.stringify(patch));
                        copyPatch.name = name;
                        props.updatePatch(copyPatch);
                    }}
                />
            </Box>
        </ThemeProvider>
    );
}

export default EditorComponent;
