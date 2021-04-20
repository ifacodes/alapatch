import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectById } from './parameters/parameterSlice.js';
import Card from './card';
import { Knob, Select, Checkbox } from '../utils/components';
import { parameterUpdated } from './parameters/parameterSlice';

export default function Arpeggiator(props) {
  const parameters_1 = useSelector((state) => selectById(state, props.id1));
  const parameters_2 = useSelector((state) => selectById(state, props.id2));
  const dispatch = useDispatch();
  return (
    <Card className={props.className} header="Arpeggiator">
      <div className="flex flex-row">
        <section className="flex flex-col justify-around w-2/5">
          <div className="flex flex-row items-center justify-between">
            <h3>Type</h3>
            <Select
              className="select w-1/2"
              value={parameters_1.type}
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
                    id: props.id1,
                    changes: { type: value },
                  })
                )
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <h3>Range</h3>
            <Select
              className="select w-1/2"
              labelFunction={(v) => `${v.value} Oct`}
              value={parameters_1.range}
              list={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id1,
                    changes: { range: value },
                  })
                )
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <h3>Resolution</h3>
            <Select
              className="select w-1/2"
              value={parameters_1.resolution}
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
                    id: props.id1,
                    changes: { resolution: value },
                  })
                )
              }
            />
          </div>
        </section>
        <section className="mb-2 flex flex-col justify-around w-1/5">
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <h3>Tempo</h3>
              <Knob
                max={280}
                offset={20}
                value={parameters_1.tempo - 20}
                onChange={(value) =>
                  dispatch(
                    parameterUpdated({
                      id: props.id1,
                      changes: { tempo: value + 20 },
                    })
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <h3>Gate</h3>
              <Knob
                max={100}
                value={parameters_1.gate}
                onChange={(value) =>
                  dispatch(
                    parameterUpdated({
                      id: props.id1,
                      changes: { gate: value },
                    })
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <h3>Swing</h3>
              <Knob
                dual={true}
                max={100}
                value={parameters_2.swing}
                onChange={(value) =>
                  dispatch(
                    parameterUpdated({
                      id: props.id2,
                      changes: { swing: value },
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col space-y-4 w-2/5">
          <div className="flex flex-row items-center justify-between">
            <h3>Target</h3>
            <Select
              className="select w-1/2"
              value={parameters_2.target}
              list={[
                { value: 'Both' },
                { value: 'Timbre 1' },
                { value: 'Timbre 2' },
              ]}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id2,
                    changes: { target: value },
                  })
                )
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <h3>Last Step</h3>
            <Select
              className="select w-1/2"
              labelFunction={(v) => `Step ${v.value}`}
              value={parameters_2.lastStep}
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
                    id: props.id2,
                    changes: { lastStep: value },
                  })
                )
              }
            />
          </div>
          <div className="pt-2 flex flex-row justify-around">
            <div className="flex flex-col items-center w-1/2">
              <h3>Key Sync</h3>
              <Checkbox
                parameter={parameters_2.keySync}
                onChange={(value) =>
                  dispatch(
                    parameterUpdated({
                      id: props.id2,
                      changes: { keySync: value },
                    })
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center w-1/2">
              <h3>Latch</h3>
              <Checkbox
                parameter={parameters_2.latch}
                onChange={(value) =>
                  dispatch(
                    parameterUpdated({
                      id: props.id2,
                      changes: { latch: value },
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
      </div>
    </Card>
  );
}
