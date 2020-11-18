import React from 'react';
import VCO from './parameters/VCO';
import Mixer from './parameters/Mixer';

export function Timbre(props) {
    return (
        <div>
            <VCO id="vco1" />
            <VCO id="vco2" />
            <Mixer id="mixer1" />
        </div>
    );
}
