import React from 'react';
import { useSelector } from 'react-redux';
import { selectById } from './timbreSlice';
import VCO, { AudioIn } from './parameters/VCO';
import Mixer from './parameters/Mixer';
import Pitch from './parameters/Pitch';
import EG from './parameters/EG';
import LFO from './parameters/LFO';
import { VocoderFilter, FCMod } from './parameters/Filter';
import { VocoderAmp } from './parameters/Amp';
import Levels from './parameters/Levels';
import Pans from './parameters/Pans';
import styles from './Timbre.module.css';

export default function Vocoder(props) {
    const ids = useSelector((state) => selectById(state, props.id));
    return (
        <div className={styles.timbreStyle}>
            <VCO
                name="VCO"
                id={ids.vco}
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
            <AudioIn name="Audio In" id={ids.audioIn} />
            <Mixer name="Mixer" id={ids.mixer} />
            <Pitch name="Pitch" id={ids.pitch} />
            <VocoderFilter name="Filter" id={ids.filter} />
            <FCMod name="FC Mod" id={ids.fcMod} />
            <VocoderAmp name="Amp" id={ids.amp} />
            <EG name="EG" id={ids.eg} />
            <div className={styles.lineBreak} />
            <LFO name="LFO 1" id={ids.lfo1} />
            <LFO name="LFO 2" id={ids.lfo2} />
            <Levels name="Levels" id={ids.levels} />
            <Pans name="Pans" id={ids.pans} />
        </div>
    );
}
