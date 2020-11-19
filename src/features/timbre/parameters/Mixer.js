import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider } from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function Mixer(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <Slider
                parameter={parameters.vol1}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { vol1: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.vol2}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { vol2: value },
                        })
                    )
                }
            />
            <Slider
                parameter={parameters.vol3}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { vol3: value },
                        })
                    )
                }
            />
        </div>
    );
}
