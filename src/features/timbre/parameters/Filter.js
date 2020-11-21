import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function Filter(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <span className={styles.header}>{`${props.name}`}</span>
            Filter Type
            <SelectList
                value={parameters.filterType}
                list={[
                    { value: '-24db Low Pass' },
                    { value: '-12db Low Pass' },
                    { value: 'Band Pass' },
                    { value: 'High Pass' },
                ]}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { filterType: value },
                        })
                    )
                }
            />
            Cutoff
            <Slider
                parameter={parameters.cutoff}
                min={0}
                max={127}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { cutoff: value },
                        })
                    )
                }
            />
            Resonance
            <Slider
                parameter={parameters.resonance}
                min={0}
                max={127}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { resonance: value },
                        })
                    )
                }
            />
            EG Intensity
            <Slider
                parameter={parameters.egIntensity}
                min={-63}
                max={63}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { egIntensity: value },
                        })
                    )
                }
            />
            Keyboard Tracking
            <Slider
                parameter={parameters.keyboardTrack}
                min={-63}
                max={63}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { keyboardTrack: value },
                        })
                    )
                }
            />
        </div>
    );
}

export const VocoderFilter = (props) => {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <span className={styles.header}>{`${props.name}`}</span>
            Cutoff
            <Slider
                parameter={parameters.cutoff}
                min={0}
                max={127}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { cutoff: value },
                        })
                    )
                }
            />
            Resonance
            <Slider
                parameter={parameters.resonance}
                min={0}
                max={127}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { resonance: value },
                        })
                    )
                }
            />
            EF Sense
            <Slider
                parameter={parameters.efSense}
                min={0}
                max={127}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { efSense: value },
                        })
                    )
                }
            />
        </div>
    );
};

export const FCMod = (props) => {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <span className={styles.header}>{`${props.name}`}</span>
            Source
            <SelectList
                value={parameters.source}
                list={[
                    { value: 'Amp EG' },
                    { value: 'LFO 1' },
                    { value: 'LFO 2' },
                    { value: 'Velocity' },
                    { value: 'Keyboard Track' },
                    { value: 'Pitch Bend' },
                    { value: 'Mod Wheel' },
                ]}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { source: value },
                        })
                    )
                }
            />
            Intensity
            <Slider
                parameter={parameters.intensity}
                min={0}
                max={127}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { intensity: value },
                        })
                    )
                }
            />
        </div>
    );
};
