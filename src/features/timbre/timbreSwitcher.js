import React from 'react';
import Timbre from './Timbre';
import Vocoder from './Vocoder';
import { useDispatch, useSelector } from 'react-redux';
import { timbreCurrentUpdate } from './timbreSlice';
import styles from './Timbre.module.css';

export default function TimbreSwitcher(props) {
    const currentTimbre = useSelector((state) => state.timbres.currentTimbre);
    const dispatch = useDispatch();

    function handleClick(e, value) {
        e.preventDefault();
        dispatch(timbreCurrentUpdate(value));
    }

    return (
        <div>
            <div className={styles.buttonContainer}>
                <button autoFocus onClick={(e) => handleClick(e, 'timbre1')}>
                    set to timbre 1
                </button>
                <button onClick={(e) => handleClick(e, 'timbre2')}>
                    set to timbre 2
                </button>
                <button onClick={(e) => handleClick(e, 'vocoder')}>
                    set to vocoder
                </button>
            </div>
            <div>
                {currentTimbre === 'timbre1' ? (
                    <Timbre id="timbre1" />
                ) : currentTimbre === 'timbre2' ? (
                    <Timbre id="timbre2" />
                ) : (
                    <Vocoder id="vocoder" />
                )}
            </div>
        </div>
    );
}
