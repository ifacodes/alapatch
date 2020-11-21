import React from 'react';
import { useSelector } from 'react-redux';
import VCO from './parameters/VCO';
import Mixer from './parameters/Mixer';
import Pitch from './parameters/Pitch';
import Filter from './parameters/Filter';
import EG from './parameters/EG';
import Amp from './parameters/Amp';
import LFO from './parameters/LFO';
import Patches from './parameters/Patches';
import { selectById } from './timbreSlice.js';
import styles from './Timbre.module.css';

export default function Timbre(props) {
    const ids = useSelector((state) => selectById(state, props.id));
    return (
        <div className={styles.timbreStyle}>
            <VCO
                name="VCO 1"
                id={ids.vco1}
                waveforms={[
                    { value: 'Saw' },
                    { value: 'Square' },
                    { value: 'Triangle' },
                    { value: 'Sine' },
                    { value: 'Vox Wave' },
                    { value: 'DWGS' },
                    { value: 'Noise' },
                    { value: 'Audio In' },
                ]}
                dwgsOrModTypeName="DWGS"
                dwgsOrModType={[
                    { value: 'SynSine1' },
                    { value: 'SynSine2' },
                    { value: 'SynSine3' },
                    { value: 'SynSine4' },
                    { value: 'SynSine5' },
                    { value: 'SynSine6' },
                    { value: 'SynSine7' },
                    { value: 'SynBass1' },
                    { value: 'SynBass2' },
                    { value: 'SynBass3' },
                    { value: 'SynBass4' },
                    { value: 'SynBass5' },
                    { value: 'SynBass6' },
                    { value: 'SynBass7' },
                    { value: 'SynWave1' },
                    { value: 'SynWave2' },
                    { value: 'SynWave3' },
                    { value: 'SynWave4' },
                    { value: 'SynWave5' },
                    { value: 'SynWave6' },
                    { value: 'SynWave7' },
                    { value: 'SynWave8' },
                    { value: 'SynWave9' },
                    { value: '5thWave1' },
                    { value: '5thWave2' },
                    { value: '5thWave3' },
                    { value: 'Digi1' },
                    { value: 'Digi2' },
                    { value: 'Digi3' },
                    { value: 'Digi4' },
                    { value: 'Digi5' },
                    { value: 'Digi6' },
                    { value: 'Digi7' },
                    { value: 'Digi8' },
                    { value: 'Endless' },
                    { value: 'E.Piano1' },
                    { value: 'E.Piano2' },
                    { value: 'E.Piano3' },
                    { value: 'E.Piano4' },
                    { value: 'Organ1' },
                    { value: 'Organ2' },
                    { value: 'Organ3' },
                    { value: 'Organ4' },
                    { value: 'Organ5' },
                    { value: 'Organ6' },
                    { value: 'Organ7' },
                    { value: 'Clav1' },
                    { value: 'Clav2' },
                    { value: 'Guitar1' },
                    { value: 'Guitar2' },
                    { value: 'Guitar3' },
                    { value: 'Bass1' },
                    { value: 'Bass2' },
                    { value: 'Bass3' },
                    { value: 'Bass4' },
                    { value: 'Bass5' },
                    { value: 'Bell1' },
                    { value: 'Bell2' },
                    { value: 'Bell3' },
                    { value: 'Bell4' },
                    { value: 'Voice1' },
                    { value: 'Voice2' },
                    { value: 'Voice3' },
                    { value: 'Voice4' },
                ]}
            />
            <VCO
                name="VCO 2"
                id={ids.vco2}
                waveforms={[
                    { value: 'Saw' },
                    { value: 'Square' },
                    { value: 'Triangle' },
                ]}
                dwgsOrModTypeName="Mod Type"
                dwgsOrModType={[
                    { value: 'Off' },
                    { value: 'Ring' },
                    { value: 'Sync' },
                    { value: 'RingSync' },
                ]}
            />
            <Mixer name="Mixer" id={ids.mixer} />
            <Pitch name="Pitch" id={ids.pitch} />
            <Filter name="Filter" id={ids.filter} />
            <Amp name="Amp"id={ids.amp} />
            <div className={styles.lineBreak} />
            <EG name="EG 1" id={ids.eg1} />
            <EG name="EG 2" id={ids.eg2} />
            <LFO
                name="LFO 1"
                id={ids.lfo1}
                waveforms={[
                    { value: 'Saw' },
                    { value: 'Square 1' },
                    { value: 'Triangle' },
                    { value: 'Sample & Hold' },
                ]}
            />
            <LFO
                name="LFO 2"
                id={ids.lfo2}
                waveforms={[
                    { value: 'Saw' },
                    { value: 'Square 2' },
                    { value: 'Sine' },
                    { value: 'Sample & Hold' },
                ]}
            />
            <Patches name="Patches" id={ids.patches} />
        </div>
    );
}
