import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList, Checkbox } from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function LFO(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <span className={styles.header}>{`${props.name}`}</span>
            LFO Waveform
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
            Key Sync
            <SelectList
                value={parameters.keySync}
                list={['Off', 'Timbre', 'Voice']}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { keySync: value },
                        })
                    )
                }
            />
            <Checkbox
                name="Tempo Sync"
                parameter={parameters.tempoSync}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { tempoSync: value },
                        })
                    )
                }
            />
            Frequency
            <Slider
                parameter={parameters.frequency}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { frequency: value },
                        })
                    )
                }
            />
        </div>
    );
}
