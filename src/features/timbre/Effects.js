import React from 'react';
import { useSelector } from 'react-redux';
import { ModFX, Delay, EQ } from './parameters/ModFX';
import { selectById } from './timbreSlice.js';

export default function Effects(props) {
  const ids = useSelector((state) => selectById(state, props.id));
  return (
    <div>
      <ModFX id={ids.modfx} />
      <Delay id={ids.delay} />
      <EQ id={ids.eq} />
    </div>
  );
}
