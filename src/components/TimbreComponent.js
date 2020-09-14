import React, { useReducer } from "react";
import { Text, Stack, Heading, RangeInput, Select, Box, Grid } from "grommet";

const reducer = (state, action) => action;

const LabeledSlider = (props) => (
    <Box
        align="center"
        justify="start"
        direction="row"
        fill="horizontal"
        wrap={false}
        gap={props.gap}>
        <Text
            weight="bold"
            truncate={false}
            style={{ "whiteSpace": "nowrap" }}
            margin="xsmall">
            {props.label}
        </Text>
        <RangeInput
            max={props.max}
            min={props.min}
            step={props.step}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
    </Box>
);

function VCO1(props) {
    const [waveform, wfDispatch] = useReducer(reducer, 0);
    const [mod, modDispatch] = useReducer(reducer, 0);
    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                align="center"
                justify="center"
                background={{ "color": "background" }}
                gridArea="VCO1"
                pad="large"
                gap="medium"
                direction="column"
                elevation="small"
                round="small"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small">
                    <Select
                        options={[
                            "Saw",
                            "Square",
                            "Triangle",
                            "Sine",
                            "Vox Wave",
                            "DWGS",
                            "Noise",
                            "Audio In",
                        ]}
                        plain={false}
                        multiple={false}
                        name="Wave-Select"
                        placeholder="Wave Type"
                    />
                    <Select
                        options={[
                            "Saw",
                            "Square",
                            "Triangle",
                            "Sine",
                            "Vox Wave",
                            "DWGS",
                            "Noise",
                            "Audio In",
                        ]}
                        plain={false}
                        multiple={false}
                        name="DWGS-Wave-Select"
                        placeholder="DWGS Wave"
                    />
                    <Box
                        align="center"
                        justify="center"
                        direction="column"
                        gap="medium"
                        fill="horizontal"
                        margin={{ "top": "medium" }}
                        pad="xsmall">
                        <Box
                            align="center"
                            justify="start"
                            fill="horizontal"
                            direction="row"
                            gap="small">
                            <Text weight="bold">Waveform</Text>
                            <RangeInput
                                style={{ "spacing": 16 }}
                                max={127}
                                min={0}
                                step={1}
                                value={waveform}
                                onChange={(e) => {
                                    wfDispatch(e.target.value);
                                }}
                            />
                        </Box>
                        <Box
                            align="center"
                            justify="start"
                            direction="row"
                            fill="horizontal"
                            wrap={false}
                            gap="medium">
                            <Text
                                textAlign="start"
                                weight="bold"
                                truncate={false}
                                style={{ "whiteSpace": "nowrap" }}>
                                LFO Mod
                            </Text>
                            <RangeInput
                                max={127}
                                min={0}
                                step={1}
                                value={mod}
                                onChange={(e) => {
                                    modDispatch(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                level="2"
                size="small"
                textAlign="start"
                truncate={false}
                margin={{ "left": "small", "top": "xsmall" }}
                color="text">
                VCO 1
            </Heading>
        </Stack>
    );
}

function VCO2(props) {
    const [waveform, wfDispatch] = useReducer(reducer, 0);
    const [mod, modDispatch] = useReducer(reducer, 0);
    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                align="center"
                justify="center"
                background={{ "color": "background" }}
                gridArea="VCO2"
                pad="large"
                gap="medium"
                direction="column"
                elevation="small"
                round="small"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small">
                    <Select
                        options={["Saw", "Square", "Triangle"]}
                        plain={false}
                        multiple={false}
                        name="Wave Select"
                        placeholder="Wave Type"
                    />
                    <Select
                        options={["Off", "Ring", "Sync", "Ring-Sync"]}
                        plain={false}
                        multiple={false}
                        name="Mod Select"
                        placeholder="Mod Select"
                    />
                    <Box
                        align="center"
                        justify="center"
                        gap="small"
                        fill="horizontal"
                        flex>
                        <LabeledSlider
                            label="Waveform"
                            max={127}
                            min={0}
                            step={1}
                            value={waveform}
                            onChange={wfDispatch}
                        />
                        <LabeledSlider
                            label="LFO Mod"
                            gap="small"
                            max={127}
                            min={0}
                            step={1}
                            value={mod}
                            onChange={modDispatch}
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                level="2"
                size="small"
                textAlign="start"
                truncate={false}
                margin={{ "left": "small", "top": "xsmall" }}
                color="text">
                VCO 2
            </Heading>
        </Stack>
    );
}

function Mixer(props) {
    const [vol1, setVol1] = useReducer(reducer, 127);
    const [vol2, setVol2] = useReducer(reducer, 0);
    const [vol3, setVol3] = useReducer(reducer, 0);

    return (
        <Stack anchor="top-left" guidingChild="first" fill>
            <Box
                align="center"
                justify="center"
                background={{ "color": "background" }}
                pad="medium"
                gap="medium"
                direction="column"
                elevation="small"
                round="small">
                <Box
                    align="center"
                    justify="center"
                    pad={{ "horizontal": "medium" }}
                    margin={{ "top": "medium", "horizontal": "medium" }}
                    fill="horizontal"
                    gap="small">
                    <LabeledSlider
                        label="OSC 1"
                        max={127}
                        min={0}
                        step={1}
                        value={vol1}
                        onChange={setVol1}
                    />
                    <LabeledSlider
                        label="OSC 2"
                        max={127}
                        min={0}
                        step={1}
                        value={vol2}
                        onChange={setVol2}
                    />
                    <LabeledSlider
                        label="Noise"
                        max={127}
                        min={0}
                        step={1}
                        value={vol3}
                        onChange={setVol3}
                    />
                </Box>
            </Box>
            <Heading
                level="2"
                size="small"
                textAlign="start"
                truncate={false}
                margin={{ "left": "small", "top": "xsmall" }}
                color="text">
                Mixer
            </Heading>
        </Stack>
    );
}

function Pitch(props) {
    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                align="center"
                justify="center"
                elevation="small"
                round="small"
                fill>
                <Box align="center" justify="center" gap="medium">
                    <Select
                        options={["Mono", "Poly", "Unison"]}
                        placeholder="Voice Assign"
                    />
                    <Select
                        options={["Single", "Multi"]}
                        placeholder="Trigger Assign"
                    />
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Timbre/Pitch
            </Heading>
        </Stack>
    );
}

const TimbreComponent = (props) => (
    <Grid
        rows={["small", "xsmall", "small", "xsmall", "small", "small"]}
        columns={["medium", "medium", "medium", "medium"]}
        areas={[
            { "name": "VCO1", "start": [0, 0], "end": [0, 1] },
            { "name": "VCO2", "start": [0, 2], "end": [0, 3] },
            { "name": "Mixer", "start": [1, 0], "end": [1, 0] },
            { "name": "Pitch", "start": [1, 1], "end": [1, 3] },
        ]}
        gap="medium"
        fill="vertical">
        <Box align="center" justify="center" gridArea="VCO1">
            <VCO1 />
        </Box>
        <Box align="center" justify="center" gridArea="VCO2">
            <VCO2 />
        </Box>
        <Box align="center" justify="center" gridArea="Mixer">
            <Mixer />
        </Box>
        <Box align="center" justify="center" gridArea="Pitch">
            <Pitch></Pitch>
        </Box>
    </Grid>
);

export default TimbreComponent;
