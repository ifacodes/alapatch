import React, { useReducer } from "react";
import {
    CheckBox,
    Text,
    Stack,
    Heading,
    RangeInput,
    Select,
    Box,
    Grid,
} from "grommet";

const reducer = (state, action) => action;

const LabeledSlider = (props) => (
    <Grid
        columns={["xsmall", "small"]}
        rows={["xxxsmall"]}
        areas={[
            { "name": "text", "start": [0, 0], "end": [0, 0] },
            { "name": "sliders", "start": [1, 0], "end": [1, 0] },
        ]}>
        <Box align="center" justify="stretch" direction="row" gridArea="text">
            <Text size="small" textAlign="start" weight="bold" truncate={false}>
                {props.label}
            </Text>
        </Box>
        <Box
            align="center"
            justify="center"
            direction="row"
            fill="horizontal"
            gridArea="sliders">
            <RangeInput
                max={props.max}
                min={props.min}
                step={props.step}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </Box>
    </Grid>
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
                        margin={{ "top": "medium" }}>
                        <Box
                            align="center"
                            justify="start"
                            fill="horizontal"
                            direction="row"
                            gap="small">
                            <LabeledSlider
                                label="Waveform"
                                max={127}
                                min={0}
                                step={1}
                                value={waveform}
                                onChange={wfDispatch}
                            />
                        </Box>
                        <Box
                            align="center"
                            justify="start"
                            direction="row"
                            fill="horizontal"
                            gap="small">
                            <LabeledSlider
                                label="LFO Mod"
                                max={127}
                                min={0}
                                step={1}
                                value={mod}
                                onChange={modDispatch}
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
                        direction="column"
                        gap="medium"
                        fill="horizontal"
                        margin={{ "top": "medium" }}>
                        <Box
                            align="center"
                            justify="start"
                            fill="horizontal"
                            direction="row"
                            gap="small">
                            <LabeledSlider
                                label="Waveform"
                                max={127}
                                min={0}
                                step={1}
                                value={waveform}
                                onChange={wfDispatch}
                            />
                        </Box>
                        <Box
                            align="center"
                            justify="start"
                            fill="horizontal"
                            direction="row"
                            gap="small">
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

function AudioIn1(props) {
    const [gate, setGate] = useReducer(reducer, 0);
    const [threshold, setThreshold] = useReducer(reducer, 0);
    const [hpf, setHPF] = useReducer(reducer, 0);
    const [hpfGate, toggleHPFGate] = useReducer(reducer, true);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "top": "large" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Gate"
                            min={0}
                            max={127}
                            step={1}
                            value={gate}
                            onChange={setGate}
                        />
                        <LabeledSlider
                            label="Threshold"
                            min={0}
                            max={127}
                            step={1}
                            value={threshold}
                            onChange={setThreshold}
                        />
                        <LabeledSlider
                            label="HPF Level"
                            min={0}
                            max={127}
                            step={1}
                            value={hpf}
                            onChange={setHPF}
                        />
                        <Box
                            align="center"
                            justify="start"
                            direction="column"
                            fill="horizontal"
                            pad={{ "top": "medium" }}>
                            <CheckBox
                                checked={hpfGate}
                                label="HPF Gate"
                                onChange={({ checked }) =>
                                    toggleHPFGate(checked)
                                }
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Audio In 1
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
                direction="column"
                elevation="small"
                round="small"
                pad={{ "top": "large", "bottom": "medium" }}>
                <Box
                    align="center"
                    justify="center"
                    pad={{ "top": "small", "horizontal": "medium" }}
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
                        label={`${props.vol2}`}
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
    const [uniTune, setUniTune] = useReducer(reducer, 0);
    const [tune, setTune] = useReducer(reducer, 0);
    const [transpose, setTranspose] = useReducer(reducer, 0);
    const [portamento, setPortamento] = useReducer(reducer, 0);
    const [bend, setBend] = useReducer(reducer, 0);
    const [vInt, setVInt] = useReducer(reducer, 0);

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
                        options={["Mono", "Poly", "Unison"]}
                        plain={false}
                        multiple={false}
                        name="voice-assign"
                        placeholder="Voice Assign"
                    />
                    <Select
                        options={["Single", "Multi"]}
                        plain={false}
                        multiple={false}
                        name="trigger-mode"
                        placeholder="Trigger Mode"
                    />
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Transpose"
                            max={24}
                            min={-24}
                            step={1}
                            value={transpose}
                            onChange={setTranspose}
                        />
                        <LabeledSlider
                            label="Tune"
                            max={50}
                            min={-50}
                            step={1}
                            value={tune}
                            onChange={setTune}
                        />
                        <LabeledSlider
                            label="Unison Detune"
                            max={99}
                            min={0}
                            step={1}
                            value={uniTune}
                            onChange={setUniTune}
                        />
                        <LabeledSlider
                            label="Portamento"
                            max={127}
                            min={0}
                            step={1}
                            value={portamento}
                            onChange={setPortamento}
                        />
                        <LabeledSlider
                            label="Bend Range"
                            max={12}
                            min={-12}
                            step={1}
                            value={bend}
                            onChange={setBend}
                        />
                        <LabeledSlider
                            label="Vibrato Int"
                            max={63}
                            min={-63}
                            step={1}
                            value={vInt}
                            onChange={setVInt}
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Timbre
            </Heading>
        </Stack>
    );
}

function Filter(props) {
    const [filterType, setFilterType] = useReducer(reducer, "");
    const [cutoff, setCutoff] = useReducer(reducer, 0);
    const [resonance, setRes] = useReducer(reducer, 0);
    const [filterEG, setFilterEG] = useReducer(reducer, 0);
    const [filterTrack, setFilterTrack] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="xsmall"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small">
                    <Select
                        options={[
                            "-24db Low Pass",
                            "-12db Low Pass",
                            "Band Pass",
                            "High Pass",
                        ]}
                        value={filterType}
                        onChange={({ value }) => setFilterType(value)}
                        placeholder="Filter Type"
                    />
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Cutoff"
                            min={0}
                            max={127}
                            step={1}
                            value={cutoff}
                            onChange={setCutoff}
                        />
                        <LabeledSlider
                            label="Resonance"
                            min={0}
                            max={127}
                            step={1}
                            value={resonance}
                            onChange={setRes}
                        />
                        <LabeledSlider
                            label=" Int"
                            min={-63}
                            max={63}
                            step={1}
                            value={filterEG}
                            onChange={setFilterEG}
                        />
                        <LabeledSlider
                            label="Filter Keyboard Track"
                            min={-63}
                            max={63}
                            step={1}
                            value={filterTrack}
                            onChange={setFilterTrack}
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Filter
            </Heading>
        </Stack>
    );
}

function VocoderFilter(props) {
    const [formantShift, setFormantShift] = useReducer(reducer, "");
    const [cutoff, setCutoff] = useReducer(reducer, 0);
    const [resonance, setRes] = useReducer(reducer, 0);
    const [efSense, setEFsense] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="xsmall"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "top": "medium" }}>
                    <Select
                        options={["0", "1", "2", "-1", "-2"]}
                        value={formantShift}
                        onChange={({ value }) => setFormantShift(value)}
                        placeholder="Formant Shift"
                    />
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Cutoff"
                            min={0}
                            max={127}
                            step={1}
                            value={cutoff}
                            onChange={setCutoff}
                        />
                        <LabeledSlider
                            label="Resonance"
                            min={0}
                            max={127}
                            step={1}
                            value={resonance}
                            onChange={setRes}
                        />
                        <LabeledSlider
                            label="EF Sense"
                            min={0}
                            max={127}
                            step={1}
                            value={efSense}
                            onChange={setEFsense}
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Filter
            </Heading>
        </Stack>
    );
}

function FCMod(props) {
    const [source, setSource] = useReducer(reducer, "");
    const [intensity, setIntensity] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "top": "large" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <Select
                            options={[
                                "Amp EG",
                                "LFO 1",
                                "LFO 2",
                                "Velocity",
                                "Keyboard Track",
                                "Pitch Bend",
                                "MOD Wheel",
                            ]}
                            value={source}
                            onChange={({ value }) => setSource(value)}
                            placeholder="Source"
                        />
                        <Box
                            align="center"
                            justify="start"
                            direction="column"
                            fill="horizontal"
                            gap="medium"
                            pad={{ "vertical": "small" }}>
                            <LabeledSlider
                                label="Intensity"
                                min={0}
                                max={127}
                                step={1}
                                value={intensity}
                                onChange={setIntensity}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                FC Mod
            </Heading>
        </Stack>
    );
}

function Amp(props) {
    const [level, setLevel] = useReducer(reducer, 127);
    const [panpot, setPanpot] = useReducer(reducer, 0);
    const [ampTrack, setAmpTrack] = useReducer(reducer, 0);
    const [distortion, setDistortion] = useReducer(reducer, false);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="xsmall"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "vertical": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Level"
                            min={0}
                            max={127}
                            step={1}
                            value={level}
                            onChange={setLevel}
                        />
                        <LabeledSlider
                            label="Panpot"
                            min={-63}
                            max={63}
                            step={1}
                            value={panpot}
                            onChange={setPanpot}
                        />
                        <LabeledSlider
                            label="Amp Keyboard Track"
                            min={-63}
                            max={63}
                            step={1}
                            value={ampTrack}
                            onChange={setAmpTrack}
                        />
                        <CheckBox
                            checked={distortion}
                            label="Distortion"
                            onChange={({ distortion }) =>
                                setDistortion(distortion)
                            }
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Amp
            </Heading>
        </Stack>
    );
}

function VocoderAmp(props) {
    const [level, setLevel] = useReducer(reducer, 127);
    const [dLevel, setDLevel] = useReducer(reducer, 0);
    const [ampTrack, setAmpTrack] = useReducer(reducer, 0);
    const [distortion, setDistortion] = useReducer(reducer, false);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="xsmall"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "vertical": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Level"
                            min={0}
                            max={127}
                            step={1}
                            value={level}
                            onChange={setLevel}
                        />
                        <LabeledSlider
                            label="Direct Level"
                            min={0}
                            max={127}
                            step={1}
                            value={dLevel}
                            onChange={setDLevel}
                        />
                        <LabeledSlider
                            label="Amp Keyboard Track"
                            min={-63}
                            max={63}
                            step={1}
                            value={ampTrack}
                            onChange={setAmpTrack}
                        />
                        <CheckBox
                            checked={distortion}
                            label="Distortion"
                            onChange={({ distortion }) =>
                                setDistortion(distortion)
                            }
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Amp
            </Heading>
        </Stack>
    );
}

function EG(props) {
    const [attack, setAttack] = useReducer(reducer, 0);
    const [decay, setDecay] = useReducer(reducer, 0);
    const [sustain, setSustain] = useReducer(reducer, 0);
    const [release, setRelease] = useReducer(reducer, 0);
    const [reset, setReset] = useReducer(reducer, true);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "vertical": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <LabeledSlider
                            label="Attack"
                            min={0}
                            max={127}
                            step={1}
                            value={attack}
                            onChange={setAttack}
                        />
                        <LabeledSlider
                            label="Decay"
                            min={0}
                            max={127}
                            step={1}
                            value={decay}
                            onChange={setDecay}
                        />
                        <LabeledSlider
                            label="Sustain"
                            min={0}
                            max={127}
                            step={1}
                            value={sustain}
                            onChange={setSustain}
                        />
                        <LabeledSlider
                            label="Release"
                            min={0}
                            max={127}
                            step={1}
                            value={release}
                            onChange={setRelease}
                        />
                        <CheckBox
                            checked={reset}
                            label={`EG ${props.id} Reset`}
                            onChange={({ reset }) => setReset(reset)}
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                {`${props.name}`}
            </Heading>
        </Stack>
    );
}

function LFO(props) {
    const [waveform, setWaveForm] = useReducer(reducer, "");
    const [keySync, setKeySync] = useReducer(reducer, "");
    const [tempoSync, setTempoSync] = useReducer(reducer, false);
    const [frequency, setFreq] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "vertical": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <Select
                            options={props.options}
                            value={waveform}
                            onChange={({ value }) => setWaveForm(value)}
                            placeholder="Waveform"
                        />
                        <Select
                            options={["Off", "Timbre", "Voice"]}
                            value={keySync}
                            onChange={({ value }) => setKeySync(value)}
                            placeholder="Key Sync"
                        />
                        <Box
                            align="center"
                            justify="start"
                            direction="column"
                            fill="horizontal"
                            gap="medium"
                            pad={{ "vertical": "small" }}>
                            <CheckBox
                                checked={tempoSync}
                                label={`LFO ${props.id} Tempo Sync`}
                                onChange={({ checked }) =>
                                    setTempoSync(checked)
                                }
                            />
                            <LabeledSlider
                                label="Frequency"
                                min={0}
                                max={127}
                                step={1}
                                value={frequency}
                                onChange={setFreq}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                {`${props.name}`}
            </Heading>
        </Stack>
    );
}

function Patch(props) {
    const [src, setSrc] = useReducer(reducer, "");
    const [dest, setDest] = useReducer(reducer, "");
    const [mod, setMod] = useReducer(reducer, 0);

    return (
        <Box
            align="center"
            justify="start"
            direction="row"
            fill="horizontal"
            gap="small">
            <Select
                options={[
                    "Filter EG",
                    "Amp EG",
                    "LFO 1",
                    "LFO 2",
                    "Velocity",
                    "Keyboard Track",
                ]}
                value={src}
                onChange={({ value }) => setSrc(value)}
                placeholder={`Source ${props.id}`}
            />
            <Select
                options={[
                    "Pitch",
                    "OSC 2 Tune",
                    "OSC 1 Control",
                    "Noise Level",
                    "Cutoff",
                    "Amp",
                    "Pan",
                    "LFO 2 Frequency",
                ]}
                value={dest}
                onChange={({ value }) => setDest(value)}
                placeholder={`Dest ${props.id}`}
            />
            <LabeledSlider
                label={`Mod Int ${props.id}`}
                min={0}
                max={127}
                step={1}
                value={mod}
                onChange={setMod}
            />
        </Box>
    );
}

function Patches(props) {
    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="medium"
                    pad={{ "top": "medium" }}>
                    <Patch id={1} />
                    <Patch id={2} />
                    <Patch id={3} />
                    <Patch id={4} />
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                {`${props.name}`}
            </Heading>
        </Stack>
    );
}

function Level(props) {
    const [level, setLevel] = useReducer(reducer, 0);
    return (
        <RangeInput
            min={0}
            max={127}
            step={1}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
        />
    );
}

function Pan(props) {
    const [pan, setPan] = useReducer(reducer, 0);

    return (
        <Box
            align="center"
            justify="start"
            direction="row"
            fill="horizontal"
            gap="small">
            <RangeInput
                min={-63}
                max={63}
                step={1}
                value={pan}
                onChange={(e) => setPan(e.target.value)}
            />
        </Box>
    );
}

function LevelsPans(props) {
    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    direction="column"
                    gap="medium"
                    fill="horizontal"
                    pad={{ "top": "medium" }}>
                    <Box
                        align="center"
                        justify="center"
                        direction="row"
                        gap="medium">
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #1
                            </Text>
                            <Level id={1} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #2
                            </Text>
                            <Level id={2} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #3
                            </Text>
                            <Level id={3} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #4
                            </Text>
                            <Level id={4} />
                        </Box>
                    </Box>
                    <Box
                        align="center"
                        justify="center"
                        direction="row"
                        gap="medium">
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #5
                            </Text>
                            <Level id={5} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #6
                            </Text>
                            <Level id={6} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #7
                            </Text>
                            <Level id={7} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Level #8
                            </Text>
                            <Level id={8} />
                        </Box>
                    </Box>
                    <Box
                        align="center"
                        justify="center"
                        direction="row"
                        gap="medium">
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #1
                            </Text>
                            <Pan id={9} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #2
                            </Text>
                            <Pan id={10} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #3
                            </Text>
                            <Pan id={11} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #4
                            </Text>
                            <Pan id={12} />
                        </Box>
                    </Box>
                    <Box
                        align="center"
                        justify="center"
                        direction="row"
                        gap="medium">
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #5
                            </Text>
                            <Pan id={13} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #6
                            </Text>
                            <Pan id={14} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #7
                            </Text>
                            <Pan id={15} />
                        </Box>
                        <Box
                            align="center"
                            justify="center"
                            direction="column"
                            flex="grow">
                            <Text size="small" weight="bold">
                                Pan #8
                            </Text>
                            <Pan id={16} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Levels and Pans
            </Heading>
        </Stack>
    );
}

function ModFX(props) {
    const [type, setType] = useReducer(reducer, "");
    const [speed, setSpeed] = useReducer(reducer, 0);
    const [depth, setDepth] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "vertical": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <Select
                            options={[
                                "Flanger",
                                "Chorus",
                                "Ensemble",
                                "Phaser",
                            ]}
                            value={type}
                            onChange={({ value }) => setType(value)}
                            placeholder="Effect"
                        />
                        <Box
                            align="center"
                            justify="start"
                            direction="column"
                            fill="horizontal"
                            gap="medium"
                            pad={{ "vertical": "small" }}>
                            <LabeledSlider
                                label="LFO Speed"
                                min={0}
                                max={127}
                                step={1}
                                value={speed}
                                onChange={setSpeed}
                            />
                            <LabeledSlider
                                label="Effect Depth"
                                min={0}
                                max={127}
                                step={1}
                                value={depth}
                                onChange={setDepth}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                MOD FX
            </Heading>
        </Stack>
    );
}

function Delay(props) {
    const [type, setType] = useReducer(reducer, "");
    const [tempoSync, setTempoSync] = useReducer(reducer, false);
    const [delay, setDelay] = useReducer(reducer, 0);
    const [syncNote, setSyncNote] = useReducer(reducer, "");
    const [depth, setDepth] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "vertical": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="small">
                        <Select
                            options={["Stereo Delay", "Cross Delay"]}
                            value={type}
                            onChange={({ value }) => setType(value)}
                            placeholder="Delay"
                        />
                        <Box
                            align="center"
                            justify="start"
                            direction="column"
                            fill="horizontal"
                            gap="medium"
                            pad={{ "vertical": "small" }}>
                            <CheckBox
                                checked={tempoSync}
                                label={`Tempo Sync`}
                                onChange={({ checked }) =>
                                    setTempoSync(checked)
                                }
                            />
                            <LabeledSlider
                                label="Delay Time"
                                min={0}
                                max={127}
                                step={1}
                                value={delay}
                                onChange={setDelay}
                            />
                            <LabeledSlider
                                label="Delay Depth"
                                min={0}
                                max={127}
                                step={1}
                                value={depth}
                                onChange={setDepth}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                Delay
            </Heading>
        </Stack>
    );
}

function EQ(props) {
    const [lowFreq, setLowFreq] = useReducer(reducer, 40);
    const [hiFreq, setHiFreq] = useReducer(reducer, 100);
    const [lowGain, setLowGain] = useReducer(reducer, 0);
    const [hiGain, setHiGain] = useReducer(reducer, 0);

    return (
        <Stack fill anchor="top-left" guidingChild="first">
            <Box
                background={{ "color": "background" }}
                elevation="small"
                round="small"
                pad="large"
                gap="medium"
                fill>
                <Box
                    align="center"
                    justify="center"
                    fill="horizontal"
                    gap="small"
                    pad={{ "top": "medium" }}>
                    <Box
                        align="center"
                        justify="start"
                        direction="column"
                        fill="horizontal"
                        gap="medium">
                        <LabeledSlider
                            label="Low EQ Freq"
                            min={40}
                            max={100}
                            step={1}
                            value={lowFreq}
                            onChange={setLowFreq}
                        />
                        <LabeledSlider
                            label="Low EQ Gain"
                            min={-12}
                            max={12}
                            step={1}
                            value={lowGain}
                            onChange={setLowGain}
                        />
                        <LabeledSlider
                            label="Hi EQ Freq"
                            min={100}
                            max={180}
                            step={1}
                            value={hiFreq}
                            onChange={setHiFreq}
                        />
                        <LabeledSlider
                            label="Hi EQ Gain"
                            min={-12}
                            max={12}
                            step={1}
                            value={hiGain}
                            onChange={setHiGain}
                        />
                    </Box>
                </Box>
            </Box>
            <Heading
                textAlign="start"
                size="small"
                level="2"
                margin={{ "top": "xsmall", "left": "small" }}>
                EQ
            </Heading>
        </Stack>
    );
}

function ArpegA(props) {}

function ArpegB(props) {}

function TimbreComponent(props) {
    return (
        <Grid
            rows={["small", "xsmall", "small", "xsmall", "small", "xsmall"]}
            columns={["medium", "medium", "medium", "medium"]}
            areas={[
                { "name": "VCO1", "start": [0, 0], "end": [0, 1] },
                { "name": "VCO2", "start": [0, 2], "end": [0, 3] },
                { "name": "Mixer", "start": [1, 0], "end": [1, 0] },
                { "name": "Pitch", "start": [1, 1], "end": [1, 3] },
                { "name": "Filter", "start": [2, 0], "end": [2, 1] },
                { "name": "FilterEG", "start": [2, 2], "end": [2, 3] },
                { "name": "Amp", "start": [3, 0], "end": [3, 1] },
                { "name": "AmpEG", "start": [3, 2], "end": [3, 3] },
                { "name": "LFO1", "start": [0, 4], "end": [0, 5] },
                { "name": "LFO2", "start": [1, 4], "end": [1, 5] },
                { "name": "Patches", "start": [2, 4], "end": [3, 5] },
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
                <Mixer vol2="OSC 2" />
            </Box>
            <Box align="center" justify="center" gridArea="Pitch">
                <Pitch />
            </Box>
            <Box align="center" justify="center" gridArea="Filter">
                <Filter />
            </Box>
            <Box align="center" justify="center" gridArea="FilterEG">
                <EG name="Filter EG" id="1" />
            </Box>
            <Box align="center" justify="center" gridArea="Amp">
                <Amp />
            </Box>
            <Box align="center" justify="center" gridArea="AmpEG">
                <EG name="Amp EG" id="2" />
            </Box>
            <Box align="center" justify="center" gridArea="LFO1">
                <LFO
                    name="LFO 1"
                    id="1"
                    options={["Saw", "Square 1", "Triangle", "Sample & Hold"]}
                />
            </Box>
            <Box align="center" justify="center" gridArea="LFO2">
                <LFO
                    name="LFO 2"
                    id="2"
                    options={["Saw", "Square 2", "Sine", "Sample & Hold"]}
                />
            </Box>
            <Box align="center" justify="center" gridArea="Patches">
                <Patches name="Patches" />
            </Box>
        </Grid>
    );
}

function VocoderComponent(props) {
    return (
        <Grid
            rows={["small", "xsmall", "small", "xsmall", "small", "xsmall"]}
            columns={["medium", "medium", "medium", "medium"]}
            areas={[
                { "name": "VCO1", "start": [0, 0], "end": [0, 1] },
                { "name": "AudioIn1", "start": [0, 2], "end": [0, 3] },
                { "name": "Mixer", "start": [1, 0], "end": [1, 0] },
                { "name": "Pitch", "start": [1, 1], "end": [1, 3] },
                { "name": "Filter", "start": [2, 0], "end": [2, 1] },
                { "name": "FCMod", "start": [2, 2], "end": [2, 3] },
                { "name": "Amp", "start": [3, 0], "end": [3, 1] },
                { "name": "AmpEG", "start": [3, 2], "end": [3, 3] },
                { "name": "LFO1", "start": [0, 4], "end": [0, 5] },
                { "name": "LFO2", "start": [1, 4], "end": [1, 5] },
                { "name": "Levels", "start": [2, 4], "end": [3, 5] },
            ]}
            gap="medium"
            fill="vertical">
            <Box align="center" justify="center" gridArea="VCO1">
                <VCO1 />
            </Box>
            <Box align="center" justify="center" gridArea="AudioIn1">
                <AudioIn1 />
            </Box>
            <Box align="center" justify="center" gridArea="Mixer">
                <Mixer vol2="Audio 2" />
            </Box>
            <Box align="center" justify="center" gridArea="Pitch">
                <Pitch />
            </Box>
            <Box align="center" justify="center" gridArea="Filter">
                <VocoderFilter />
            </Box>
            <Box align="center" justify="center" gridArea="FCMod">
                <FCMod />
            </Box>
            <Box align="center" justify="center" gridArea="Amp">
                <VocoderAmp />
            </Box>
            <Box align="center" justify="center" gridArea="AmpEG">
                <EG name="Amp EG" id="2" />
            </Box>
            <Box align="center" justify="center" gridArea="LFO1">
                <LFO
                    name="LFO 1"
                    id="1"
                    options={["Saw", "Square 1", "Triangle", "Sample & Hold"]}
                />
            </Box>
            <Box align="center" justify="center" gridArea="LFO2">
                <LFO
                    name="LFO 2"
                    id="2"
                    options={["Saw", "Square 2", "Sine", "Sample & Hold"]}
                />
            </Box>
            <Box align="center" justify="center" gridArea="Levels">
                <LevelsPans />
            </Box>
        </Grid>
    );
}

function EffectsComponent(props) {
    return (
        <Grid
            rows={["small", "xsmall", "small", "xsmall"]}
            columns={["small", "small", "small", "small"]}
            areas={[
                { "name": "modFX", "start": [1, 0], "end": [2, 1] },
                { "name": "Delay", "start": [0, 2], "end": [1, 3] },
                { "name": "EQ", "start": [2, 2], "end": [3, 3] },
            ]}
            gap="medium"
            fill="vertical">
            <Box align="center" justify="center" gridArea="modFX">
                <ModFX />
            </Box>
            <Box align="center" justify="center" gridArea="Delay">
                <Delay />
            </Box>
            <Box align="center" justify="center" gridArea="EQ">
                <EQ />
            </Box>
        </Grid>
    );
}

function ArpeggioComponent(props) {
    return (
        <Grid
            rows={["small", "xsmall", "small", "xsmall"]}
            columns={["medium"]}
            areas={[
                { "name": "modFX", "start": [0, 0], "end": [0, 1] },
                { "name": "Delay", "start": [0, 2], "end": [0, 3] },
            ]}
            gap="medium"
            fill="vertical">
            <Box align="center" justify="center" gridArea="modFX">
                <ModFX />
            </Box>
            <Box align="center" justify="center" gridArea="Delay">
                <Delay />
            </Box>
        </Grid>
    );
}

export { TimbreComponent, VocoderComponent, EffectsComponent };
