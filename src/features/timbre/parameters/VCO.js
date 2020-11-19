import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function VCO(props) {
    const parameters = useSelector((state) => selectById(state, props.id));

    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
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
                max={100}
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
                max={100}
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
