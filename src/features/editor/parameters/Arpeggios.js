import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Slider, SelectList, Checkbox } from '../../helpers/Helpers';

const ArpeggA = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header='Arpeggio A'>
      <span>Arpeggio A.</span>
      <div>
        Tempo
        <Slider
          min={20}
          max={300}
          parameter={parameters.tempo}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { tempo: value },
              })
            )
          }
        />
        Resolution
        <SelectList
          value={parameters.resolution}
          list={[
            { value: '1/24' },
            { value: '1/16' },
            { value: '1/12' },
            { value: '1/8' },
            { value: '1/6' },
            { value: '1/4' },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { resolution: value },
              })
            )
          }
        />
        Gate
        <Slider
          min={0}
          max={100}
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
      </div>
      <div />
      <div>
        Type
        <SelectList
          value={parameters.type}
          list={[
            { value: 'Up' },
            { value: 'Down' },
            { value: 'Alternate 1' },
            { value: 'Alternate 2' },
            { value: 'Random' },
            { value: 'Trigger' },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { type: value },
              })
            )
          }
        />
        Range
        <SelectList
          labelFunction={(v) => `${v.value} Oct`}
          value={parameters.range}
          list={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { range: value },
              })
            )
          }
        />
      </div>
    </Card>
  );
};

const ArpeggB = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div>
      <span>Arpeggio B.</span>
      <div>
        <Checkbox
          name='Latch'
          parameter={parameters.latch}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { latch: value },
              })
            )
          }
        />
        Swing
        <Slider
          min={-100}
          max={100}
          parameter={parameters.swing}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { swing: value },
              })
            )
          }
        />
        <Checkbox
          name='Key Sync'
          parameter={parameters.keySync}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { keySync: value },
              })
            )
          }
        />
      </div>
      <div />
      <div>
        Last Step
        <SelectList
          labelFunction={(v) => `Step ${v.value}`}
          value={parameters.lastStep}
          list={[
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { lastStep: value },
              })
            )
          }
        />
        Target Timbre
        <SelectList
          value={parameters.target}
          list={[
            { value: 'Both' },
            { value: 'Timbre 1' },
            { value: 'Timbre 2' },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { target: value },
              })
            )
          }
        />
      </div>
    </div>
  );
};

export { ArpeggA, ArpeggB };
