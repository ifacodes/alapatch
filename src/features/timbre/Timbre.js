import React from 'react';
import VCO from './parameters/VCO';
import Mixer from './parameters/Mixer';
import Pitch from './parameters/Pitch';
import Filter from './parameters/Filter';
import EG from './parameters/EG';
import Amp from './parameters/Amp';
import LFO from './parameters/LFO';

export function Timbre(props) {
    return (
        <div>
            <VCO
                id="vco1"
                waveforms={[
                    'Saw',
                    'Square',
                    'Triangle',
                    'Sine',
                    'Vox Wave',
                    'DWGS',
                    'Noise',
                    'Audio In',
                ]}
                dwgsOrModType={[
                    'SynSine1',
                    'SynSine2',
                    'SynSine3',
                    'SynSine4',
                    'SynSine5',
                    'SynSine6',
                    'SynSine7',
                    'SynBass1',
                    'SynBass2',
                    'SynBass3',
                    'SynBass4',
                    'SynBass5',
                    'SynBass6',
                    'SynBass7',
                    'SynWave1',
                    'SynWave2',
                    'SynWave3',
                    'SynWave4',
                    'SynWave5',
                    'SynWave6',
                    'SynWave7',
                    'SynWave8',
                    'SynWave9',
                    '5thWave1',
                    '5thWave2',
                    '5thWave3',
                    'Digi1',
                    'Digi2',
                    'Digi3',
                    'Digi4',
                    'Digi5',
                    'Digi6',
                    'Digi7',
                    'Digi8',
                    'Endless',
                    'E.Piano1',
                    'E.Piano2',
                    'E.Piano3',
                    'E.Piano4',
                    'Organ1',
                    'Organ2',
                    'Organ3',
                    'Organ4',
                    'Organ5',
                    'Organ6',
                    'Organ7',
                    'Clav1',
                    'Clav2',
                    'Guitar1',
                    'Guitar2',
                    'Guitar3',
                    'Bass1',
                    'Bass2',
                    'Bass3',
                    'Bass4',
                    'Bass5',
                    'Bell1',
                    'Bell2',
                    'Bell3',
                    'Bell4',
                    'Voice1',
                    'Voice2',
                    'Voice3',
                    'Voice4',
                ]}
            />
            <VCO
                id="vco2"
                waveforms={['Saw', 'Square', 'Triangle']}
                dwgsOrModType={['Off', 'Ring', 'Sync', 'RingSync']}
            />
            <Mixer id="mixer1" />
            <Pitch id="pitch1" />
            <Filter id="filter1" />
            <EG id="eg1" />
            <Amp id="amp1" />
            <EG id="eg2" />
            <LFO
                id="lfo1"
                waveforms={['Saw', 'Square 1', 'Triangle', 'Sample & Hold']}
            />
            <LFO
                id="lfo2"
                waveforms={['Saw', 'Square 2', 'Sine', 'Sample & Hold']}
            />
        </div>
    );
}
