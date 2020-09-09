`<F0 42 30 58>` header meaning it's a SYSEX message
`<40>` current program dump, this is sent to tell then machine to set the current patch to the values of the SYSEX
data...
`<F7>` end of a SYSEX message

so, they handle the actual data differently then the midi format on the synthesizer, so they pad the dump data to midi data by inserting an extra byte in front of the 7 byte set.
so when the machine converts to and from the SYSEX message to the "dump" format it uses, it pads the file with spare bytes.
see Note 1:

254 Bytes (Table 1) = 7*\36+2 -> 8*36+(1+2) => 291 Bytes

so they look at the data in 7 bytes at a time (even though the settings are not grouped that way)
and when the convert to and from a sysex file, that add an extra byte to the beginning of every group of 7.

Table 1 in the Documentation is the Settings and how they are stored in the bytes. (counting from 0)
They keep the main parameters for the sound in three subtables representing the different voices a sound can have.
Those tables display the byte as the table range start + the offset.

if a setting says it has a range of, for example, -3 to +3, it's most likely ignoring the 8th bit, and only using 7 bits for the number.

Table 2 is the 1st Timbre's Parameters, from bytes 38-145

Table 3 is the 2st Timbre's Parameters, from bytes 146-253 (these two are mostly the same)

Table 4 is the Vocoder's Timbre
