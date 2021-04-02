import React from 'react';
import { useSelector } from 'react-redux';
import { selectById } from './timbreSlice.js';
import { ArpeggA, ArpeggB } from './parameters/Arpeggios';

export default function Arpeggio(props) {
  const ids = useSelector((state) => selectById(state, props.id));
  return (
    <div>
      <ArpeggA id={ids.arpeggA} />
      <ArpeggB id={ids.arpeggB} />
    </div>
  );
}
