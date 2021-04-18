import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Select, Knob, Checkbox } from '../../utils/components';

export default function VCO(props) {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className="col-span-2" header={props.name}>
      <div className="-mt-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Waveform</h3>
        <Select
          className="select w-4/6"
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
      </div>
      <div className="-mt-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{`${props.dwgsOrModTypeName}`}</h3>
        <Select
          className="select w-4/6"
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
      </div>
      <div className="mb-2 flex flex-row">
        <div className="flex flex-col items-center w-1/2">
          <h3 className="text-lg font-semibold text-gray-900">Waveform Mod</h3>
          <Knob
            maxValue={127}
            value={parameters.waveMod}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { waveMod: value },
                })
              )
            }
          />
        </div>
        <div className="flex flex-col items-center w-1/2">
          <h3 className="text-lg font-semibold text-gray-900">LFO Mod</h3>
          <Knob
            maxValue={127}
            value={parameters.lfoMod}
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
      </div>
    </Card>
  );
}

export const AudioIn = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header={props.name}>
      <div className="-mt-3 flex flex-col items-stretch space-y-4">
        <div className="flex flex-row">
          <div className="flex flex-col items-center w-1/2">
            <h3>Gate Sense</h3>
            <Knob
              max={127}
              value={parameters.gate}
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
          <div className="flex flex-col items-center w-1/2">
            <h3>Threshold</h3>
            <Knob
              max={127}
              value={parameters.threshold}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { threshold: value },
                  })
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col items-center w-1/2">
            <h3>HPF Level</h3>
            <Knob
              max={127}
              value={parameters.hpfLevel}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { hpfLevel: value },
                  })
                )
              }
            />
          </div>
          <div className="flex flex-col items-center w-1/2">
            <h3>HPF Gate</h3>
            <Checkbox
              className="checkbox"
              value={parameters.hpfGate}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { hpfGate: value },
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
