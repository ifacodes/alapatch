import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList, Checkbox } from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function VCO(props) {
    const parameters = useSelector((state) => selectById(state, props.id));

    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <span className={styles.header}>{`${props.name}`}</span>
            Waveform
            <SelectList
                value={parameters.waveform}
                list={props.waveforms}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { waveform: value },
                        })
                    )
                }
            />
            {`${props.dwgsOrModTypeName}`}
            <SelectList
                value={parameters.dwgsOrModType}
                list={props.dwgsOrModType}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { dwgsOrModType: value },
                        })
                    )
                }
            />
            Waveform Mod
            <Slider
                min={0}
                max={127}
                parameter={parameters.waveMod}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { waveMod: value },
                        })
                    )
                }
            />
            LFO Mod
            <Slider
                min={0}
                max={127}
                parameter={parameters.lfoMod}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { lfoMod: value },
                        })
                    )
                }
            />
        </div>
    );
}

export const AudioIn = (props) => {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <span className={styles.header}>{`${props.name}`}</span>
            Gate
            <Slider
                min={0}
                max={127}
                parameter={parameters.gate}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { gate: value },
                        })
                    )
                }
            />
            Threshold
            <Slider
                min={0}
                max={127}
                parameter={parameters.threshold}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { threshold: value },
                        })
                    )
                }
            />
            HPF Level
            <Slider
                min={0}
                max={127}
                parameter={parameters.hpfLevel}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { hpfLevel: value },
                        })
                    )
                }
            />
            HPF Gate
            <Checkbox
                parameter={parameters.hpfGate}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { hpfGate: value },
                        })
                    )
                }
            />
        </div>
    );
};
