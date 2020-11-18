import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList } from '../../helpers/Helpers';

export default function VCO(props) {
    const parameters = useSelector((state) => selectById(state, props.id));

    const dispatch = useDispatch();
    return (
        <div>
            <Slider
                min="0"
                max="100"
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
            <SelectList
                value={parameters.waveform}
                list={['Saw', 'Square', 'Triangle']}
                onChange={(value) =>
                    dispatch(
                        parameterUpdated({
                            id: props.id,
                            changes: { waveform: value },
                        })
                    )
                }
            />
        </div>
    );
}
