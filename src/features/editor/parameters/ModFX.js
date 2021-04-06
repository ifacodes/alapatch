import React from 'react';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { selectById, parameterUpdated } from './parameterSlice.js';
import { Knob, Select, Checkbox } from '../../utils/components';

const ModFX = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header='Mod FX'>
      <div className='flex flex-row items-center justify-between'>
        <h3>Mod Type</h3>
        <Select
          className='select'
          value={parameters.type}
          list={[
            { value: 'Flanger/Chorus' },
            { value: 'Ensemble' },
            { value: 'Phaser' },
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
      </div>
      <div className='flex flex-col items-center'>
        <h3>LFO Speed</h3>
        <Knob
          max={127}
          value={parameters.lfoSpeed}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { lfoSpeed: value },
              })
            )
          }
        />
      </div>
      <div className='flex flex-col items-center'>
        <h3>Mod FX Depth</h3>
        <Knob
          max={127}
          value={parameters.effectDepth}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { effectDepth: value },
              })
            )
          }
        />
      </div>
    </Card>
  );
};

const Delay = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header='Delay'>
      <div className='flex flex-row items-center justify-between'>
        <h3>Delay Type</h3>
        <Select
          className='select'
          value={parameters.type}
          list={[
            { value: 'Stereo Delay' },
            { value: 'Cross Delay' },
            { value: 'L/R Delay' },
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
      </div>
      <div className='flex flex-col items-center'>
        <h3>Tempo Sync</h3>
        <Checkbox
          value={parameters.tempoSync}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { tempoSync: value },
              })
            )
          }
        />
      </div>
      <div className='flex flex-row'>
        {parameters.tempoSync ? (
          <div className='flex flex-col items-center w-1/2'>
            <h3>Sync Note</h3>
            <Select
              className='select'
              value={parameters.syncNote}
              list={[
                { value: '1/32' },
                { value: '1/24' },
                { value: '1/16' },
                { value: '1/12' },
                { value: '3/32' },
                { value: '1/8' },
                { value: '1/6' },
                { value: '3/16' },
                { value: '1/4' },
                { value: '1/3' },
                { value: '3/8' },
                { value: '1/2' },
                { value: '2/3' },
                { value: '3/4' },
                { value: '1/1' },
              ]}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { syncNote: value },
                  })
                )
              }
            />
          </div>
        ) : (
          <div className='flex flex-col items-center w-1/2'>
            <h3>Delay Time</h3>
            <Knob
              max={127}
              value={parameters.delayTime}
              onChange={(value) =>
                dispatch(
                  parameterUpdated({
                    id: props.id,
                    changes: { delayTime: value },
                  })
                )
              }
            />
          </div>
        )}
        <div className='flex flex-col items-center w-1/2'>
          <h3>Delay Depth</h3>
          <Knob
            max={127}
            value={parameters.delayDepth}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { delayDepth: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
};

const EQ = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <Card className={props.className} header='EQ'>
      <div className='flex flex-row items-center justify-between'>
        <h3>Low Freq</h3>
        <Select
          className='select w-2/4'
          labelFunction={(e) => `${e.value}kHz`}
          value={parameters.lowFrequency}
          list={[
            { value: 40 },
            { value: 50 },
            { value: 60 },
            { value: 80 },
            { value: 100 },
            { value: 120 },
            { value: 140 },
            { value: 160 },
            { value: 180 },
            { value: 200 },
            { value: 220 },
            { value: 240 },
            { value: 260 },
            { value: 280 },
            { value: 300 },
            { value: 320 },
            { value: 340 },
            { value: 360 },
            { value: 380 },
            { value: 400 },
            { value: 420 },
            { value: 440 },
            { value: 460 },
            { value: 480 },
            { value: 500 },
            { value: 600 },
            { value: 700 },
            { value: 800 },
            { value: 900 },
            { value: 1000 },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { lowFrequency: value },
              })
            )
          }
        />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <h3>High Freq</h3>
        <Select
          className='select w-2/4'
          labelFunction={(e) => `${e.value}kHz`}
          value={parameters.highFrequency}
          list={[
            { value: 1.0 },
            { value: 1.25 },
            { value: 1.5 },
            { value: 1.75 },
            { value: 2.0 },
            { value: 2.25 },
            { value: 2.5 },
            { value: 2.75 },
            { value: 3.0 },
            { value: 3.25 },
            { value: 3.5 },
            { value: 3.75 },
            { value: 4.0 },
            { value: 4.25 },
            { value: 4.5 },
            { value: 4.75 },
            { value: 5.0 },
            { value: 5.25 },
            { value: 5.5 },
            { value: 5.75 },
            { value: 6.0 },
            { value: 7.0 },
            { value: 8.0 },
            { value: 9.0 },
            { value: 10.0 },
            { value: 11.0 },
            { value: 12.0 },
            { value: 14.0 },
            { value: 16.0 },
            { value: 18.0 },
          ]}
          onChange={(value) =>
            dispatch(
              parameterUpdated({
                id: props.id,
                changes: { highFrequency: value },
              })
            )
          }
        />
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center w-1/2'>
          <h3>Low Gain</h3>
          <Knob
            dual={true}
            max={12}
            value={parameters.lowGain}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { lowGain: value },
                })
              )
            }
          />
        </div>
        <div className='flex flex-col items-center w-1/2'>
          <h3>High Gain</h3>
          <Knob
            dual={true}
            max={12}
            value={parameters.highGain}
            onChange={(value) =>
              dispatch(
                parameterUpdated({
                  id: props.id,
                  changes: { highGain: value },
                })
              )
            }
          />
        </div>
      </div>
    </Card>
  );
};

export { ModFX, Delay, EQ };
