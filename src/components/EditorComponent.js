import React, { useEffect, useState } from "react";
import { Collapsible, Tab, Tabs, Grid, Box } from "grommet";

import TimbreComponent from "./TimbreComponent";

function EditorComponent(props) {
    return (
        <Box
            align="center"
            justify="start"
            fill
            direction="column"
            overflow="hidden">
            <Tabs>
                <Tab title="Timbre 1">
                    <Box pad="medium" align="center" justify="center">
                        <TimbreComponent />
                    </Box>
                </Tab>
                <Tab title="Timbre 2"></Tab>
                <Tab title="Vocoder"></Tab>
                <Tab title="Effects"></Tab>
                <Tab title="Arpeggio"></Tab>
            </Tabs>
        </Box>
    );
}

export default EditorComponent;
