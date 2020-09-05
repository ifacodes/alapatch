import React, { useState, useEffect } from "react";

function PatchEditorComponent() {
    const [patch, updatePatch] = useState(null);

    useEffect(
        {
            // update the dump and send out a sysex message to the system
        },
        [patch]
    );

    return (
        // placeholder div
        <div></div>
    );
}

export default PatchEditorComponent;
