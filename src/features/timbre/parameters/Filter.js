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
