import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function Pitch(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <SelectList
                value={parameters.voiceAssign}
                list={['Mono', 'Poly', 'Unison']}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { voiceAssign: value },
                        })
                    )
                }
            />
            <SelectList
                value={parameters.triggerMode}
                list={['Single', 'Multiple']}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { triggerMode: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.transpose}
                min="-24"
                max="24"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { transpose: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.tune}
                min="-50"
                max="50"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { tune: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.unisonDetune}
                min="0"
                max="99"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { unisonDetune: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.portamento}
                min="0"
                max="127"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { portamento: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.bendRange}
                min="-12"
                max="12"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { bendRange: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.vibratoIntensity}
                min="-63"
                max="63"
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { vibratoIntensity: value },
                        })
                    )
                }
            />
        </div>
    );
}
