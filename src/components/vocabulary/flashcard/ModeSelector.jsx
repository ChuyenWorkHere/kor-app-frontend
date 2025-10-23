import React, { useState } from "react";

const ModeSelector = ({ modes, selected, setSelected }) => {

    return (
        <div className="mt-3 row">
            {modes.map((mode) => (
                <div className="col-6 col-md-3 p-2" key={mode}>
                    <button
                        type="button"
                        className={`btn w-100 ${selected === mode ? "btn-primary text-white fw-semibold" : "btn-outline-secondary fw-semibold"
                            }`}
                        onClick={() => setSelected(mode)}
                    >
                        {mode}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ModeSelector;
