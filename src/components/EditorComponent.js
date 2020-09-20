import React from "react";
import { Tab, Tabs, Box } from "grommet";

import {
    TimbreComponent,
    VocoderComponent,
    EffectsComponent,
} from "./EditorTabComponent";

function EditorComponent(props) {
    return (
        <Box
            align="center"
            justify="start"
            fill
            direction="column"
            overflow="hidden">
            <Tabs fill="horizontal">
                <Tab title="Timbre 1">
                    <Box
                        key="timbre1"
                        pad="medium"
                        align="center"
                        justify="center"
                        animation={{ type: "zoomIn", duration: 200 }}>
                        <TimbreComponent key={1} />
                    </Box>
                </Tab>
                <Tab title="Timbre 2">
                    <Box
                        key="timbre2"
                        pad="medium"
                        align="center"
                        justify="center"
                        animation={{ type: "zoomIn", duration: 200 }}>
                        <TimbreComponent key={2} />
                    </Box>
                </Tab>
                <Tab title="Vocoder">
                    <Box
                        pad="medium"
                        align="center"
                        justify="center"
                        animation={{ type: "zoomIn", duration: 200 }}>
                        <VocoderComponent key={3} />
                    </Box>
                </Tab>
                <Tab title="Effects">
                    <Box
                        pad="medium"
                        align="center"
                        justify="center"
                        animation={{ type: "zoomIn", duration: 200 }}>
                        <EffectsComponent key={4} />
                    </Box>
                </Tab>

                <Tab title="Arpeggio"></Tab>
            </Tabs>
        </Box>
    );
}

export default EditorComponent;
