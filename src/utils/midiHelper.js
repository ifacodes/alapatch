const EXPECTED_DUMP_LENGTH = 297;
const MAX_DUMP_RETRIES = 15;
const DUMP_RETRY_DELAY = 1500;

let dumpRetryCount = 0;
let dumpRetryTimer = null;

let selectedMidiOutput = null;
let selectedMidiInput = null;
let onLogCallback = null;
let onAllDumpReceivedCallback = null;
let selectedKeyboardInput = null;

// Nouvelle fonction de rappel pour transmettre le dump reçu à Redux
let onPatchReceivedCallback = null;

export const registerMidiLogger = (callback) => { onLogCallback = callback; };

export const registerAllDumpReceiver = (callback) => {
  onAllDumpReceivedCallback = callback;
};

/**
 * Permet à Redux d'enregistrer sa fonction de capture de patch
 */
export const registerPatchReceiver = (callback) => {
  onPatchReceivedCallback = callback;
};

const bytesToHexStr = (bytes) => {
  return Array.from(bytes).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
};

const logMidiActivity = (direction, directionArrow, rawData) => {
  if (onLogCallback) {
    const timestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    logMidiActivityRaw(timestamp, direction, directionArrow, rawData);
  }
};

const logMidiActivityRaw = (timestamp, direction, directionArrow, rawData) => {
  if (rawData.length > 10) {
    // Si la trame est trop longue (comme un dump), on résume l'affichage dans la console noire
    onLogCallback({ text: `[${timestamp}] ${directionArrow} [DUMP SYSEX RECEVED - ${rawData.length} BYTES]`, type: direction });
  } else {
    onLogCallback({ text: `[${timestamp}] ${directionArrow} ${bytesToHexStr(rawData)}`, type: direction });
  }
};

export const initWebMidi = () => {
  return new Promise((resolve) => {
    if (!navigator.requestMIDIAccess) return resolve({ inputs: [], outputs: [] });
    navigator.requestMIDIAccess({ sysex: true }).then((midiAccess) => {
      const outputs = Array.from(midiAccess.outputs.values());
      const inputs = Array.from(midiAccess.inputs.values());
      if (outputs.length > 0 && !selectedMidiOutput) selectedMidiOutput = outputs[0];
      if (inputs.length > 0 && !selectedMidiInput) setupMidiInputListener(inputs[0]);
      resolve({
        outputs: outputs.map(port => ({ id: port.id, name: port.name })),
        inputs: inputs.map(port => ({ id: port.id, name: port.name }))
      });
    }).catch(() => resolve({ inputs: [], outputs: [] }));
  });
};

export const changeMidiOutputPort = (portId) => {
  if (!navigator.requestMIDIAccess) return;
  navigator.requestMIDIAccess({ sysex: true }).then((midiAccess) => {
    const outputs = Array.from(midiAccess.outputs.values());
    const target = outputs.find(port => port.id === portId);
    if (target) selectedMidiOutput = target;
  });
};

export const changeMidiInputPort = (portId) => {
  if (!navigator.requestMIDIAccess) return;
  navigator.requestMIDIAccess({ sysex: true }).then((midiAccess) => {
    const inputs = Array.from(midiAccess.inputs.values());
    const target = inputs.find(port => port.id === portId);
    if (target) setupMidiInputListener(target);
  });
};

export const changeKeyboardInputPort = (portId, channel = 1) => {
  if (!navigator.requestMIDIAccess) return;

  navigator.requestMIDIAccess({ sysex: true }).then((midiAccess) => {
    const inputs = Array.from(midiAccess.inputs.values());
    const target = inputs.find(port => port.id === portId);

    if (selectedKeyboardInput) {
      selectedKeyboardInput.onmidimessage = null;
    }

    selectedKeyboardInput = target;

    if (selectedKeyboardInput) {
      selectedKeyboardInput.onmidimessage = (event) => {
        const data = Array.from(event.data);
        const command = data[0] & 0xF0;

        if (command >= 0x80 && command <= 0xE0) {
          data[0] = command | ((channel - 1) & 0x0F);
        }

        if (selectedMidiOutput) {
          selectedMidiOutput.send(data);
          logMidiActivity('out', '🎹 THRU', data);
        }
      };
    }
  });
};

/**
 * Envoie une requête de "Current Parameter Dump" au microKORG
 */

export const requestCurrentPatchDump = () => {
  if (!selectedMidiOutput) return;

  dumpRetryCount = 0;

  if (dumpRetryTimer) {
    clearTimeout(dumpRetryTimer);
    dumpRetryTimer = null;
  }

  sendCurrentPatchDumpRequest();
};

export const requestAllDump = () => {
  console.log('[MIDI] requestAllDump déclenché');

  if (!selectedMidiOutput) {
    console.error('[MIDI] aucune sortie MIDI sélectionnée');
    return;
  }

  const requestMessage = [0xF0, 0x42, 0x30, 0x58, 0x1C, 0xF7];

  console.log('[MIDI] REQ ALL:', requestMessage);
  selectedMidiOutput.send(requestMessage);
  logMidiActivity('out', '➡️ REQ ALL', requestMessage);
};

const sendCurrentPatchDumpRequest = () => {
  if (!selectedMidiOutput) return;

  const requestMessage = [
    0xF0,
    0x42,
    0x30,
    0x58,
    0x10,
    0xF7
  ];

  selectedMidiOutput.send(requestMessage);

  logMidiActivity(
    'out',
    dumpRetryCount === 0 ? '➡️ REQ' : `➡️ RETRY ${dumpRetryCount}`,
    requestMessage
  );
};

const setupMidiInputListener = (inputPort) => {
  if (selectedMidiInput) {
    selectedMidiInput.onmidimessage = null;
  }

  selectedMidiInput = inputPort;

  selectedMidiInput.onmidimessage = (event) => {
    const data = new Uint8Array(event.data);

    if (data[0] === 0xF8) return;

    const isCurrentProgramDump =
      data[0] === 0xF0 &&
      data[1] === 0x42 &&
      data[3] === 0x58 &&
      data[4] === 0x40;

    if (!isCurrentProgramDump) {
      logMidiActivity('in', '⬅️ IN ', data);
      return;
    }

    console.log(
      `[MIDI] Current dump reçu : ${data.length}/${EXPECTED_DUMP_LENGTH} octets`
    );

    if (data.length === EXPECTED_DUMP_LENGTH) {
      dumpRetryCount = 0;

      if (dumpRetryTimer) clearTimeout(dumpRetryTimer);

      logMidiActivity('in', '⬅️ DUMP OK', data);

      if (onPatchReceivedCallback) {
        onPatchReceivedCallback(data);
      }

      return;
    }

    logMidiActivity(
      'in',
      `⬅️ DUMP ${data.length}/${EXPECTED_DUMP_LENGTH}`,
      data
    );

    if (dumpRetryCount >= MAX_DUMP_RETRIES) {
      console.error(
        `[MIDI] abandon après ${MAX_DUMP_RETRIES} tentatives - dernier dump : ${data.length} octets`
      );
      return;
    }

    dumpRetryCount++;

    dumpRetryTimer = setTimeout(() => {
      sendCurrentPatchDumpRequest();
    }, DUMP_RETRY_DELAY);
  };
};


export const sendMicroKorgParam = (parameterId, value) => {
  if (!selectedMidiOutput) return;
  const sysExMessage = [0xF0, 0x42, 0x30, 0x58, 0x41, parameterId, value, 0xF7];
  selectedMidiOutput.send(sysExMessage);
  logMidiActivity('out', '➡️ OUT', sysExMessage);
};
