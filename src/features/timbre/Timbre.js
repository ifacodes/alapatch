import React from 'react';
import VCO from './parameters/VCO';
import Mixer from './parameters/Mixer';
import Pitch from './parameters/Pitch';
import Filter from './parameters/Filter';
import EG from './parameters/EG';

export function Timbre(props) {
    return (
        <div>
            <VCO id="vco1" />
            <VCO id="vco2" />
            <Mixer id="mixer1" />
            <Pitch id="pitch1" />
            <Filter id="filter1" />
            <EG id="eg1" />
            <EG id="eg2" />
        </div>
    );
}
