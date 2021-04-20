import React from 'react';
import { useSelector } from 'react-redux';
import { ModFX, Delay, EQ } from './parameters/ModFX';
import { selectById } from './timbreSlice.js';
import Arpeggiator from './Arpeggio';

export default function Effects(props) {
  const ids = useSelector((state) => selectById(state, props.id));
  return (
    <div className="flex flex-wrap justify-between py-6 px-4">
      <ModFX className="flex-grow w-80" id={ids.modfx} />
      <Delay className="flex-grow w-80" id={ids.delay} />
      <EQ className="flex-grow w-80" id={ids.eq} />
      <Arpeggiator
        className="flex-grow w-96"
        id1={ids.arpeggA}
        id2={ids.arpeggB}
      />
    </div>
  );
}
