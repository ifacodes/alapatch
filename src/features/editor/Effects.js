import React from 'react';
import { useSelector } from 'react-redux';
import { ModFX, Delay, EQ } from './parameters/ModFX';
import { selectById } from './timbreSlice.js';
import { Arpeggiator } from './Arpeggio';

export default function Effects(props) {
  const ids = useSelector((state) => selectById(state, props.id));
  return (
    <div className='h-screen grid grid-cols-10 grid-rows-6 gap-4 p-6'>
      <ModFX
        className='row-start-2 col-start-3 col-span-2 row-span-2'
        id={ids.modfx}
      />
      <Delay
        className='row-start-2 col-start-5 col-span-2 row-span-2'
        id={ids.delay}
      />
      <EQ
        className='row-start-2 col-start-7 col-span-2 row-span-2'
        id={ids.eq}
      />
      <Arpeggiator
        className='row-start-4 row-span-2 col-start-4 col-span-4'
        id1={ids.arpeggA}
        id2={ids.arpeggB}
      />
    </div>
  );
}
