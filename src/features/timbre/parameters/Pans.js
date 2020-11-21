import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider} from '../../helpers/Helpers';
import styles from './Parameters.module.css';

export default function Pans(props) {
    const parameters = useSelector((state) => selectById(state, props.id));
    const dispatch = useDispatch();

    return (
        <div className={styles.horizontalContainer}>
            <span className={styles.header}>{`${props.name}`}</span>
            <div className={styles.container}>
            Pan 1
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan1}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan1: value },
                        })
                    )
                }
            />
            Pan 2
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan2}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan2: value },
                        })
                    )
                }
            />
            Pan 3
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan3}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan3: value },
                        })
                    )
                }
            />
            Pan 4
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan4}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan4: value },
                        })
                    )
                }
            />
            </div>
            <div className={styles.divider}/>
            <div className={styles.container}>
            Pan 5
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan5}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan5: value },
                        })
                    )
                }
            />
            Pan 6
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan6}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan6: value },
                        })
                    )
                }
            />
            Pan 7
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan7}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan7: value },
                        })
                    )
                }
            />
            Pan 8
            <Slider
                min={0}
                max={127}
                parameter={parameters.pan8}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { pan8: value },
                        })
                    )
                }
            />
            </div>
        </div>
    );
}