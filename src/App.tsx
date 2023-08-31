import React, { useState } from 'react';

import './App.css';
import Building from './components/Building';

const ElevatorApp: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(true);
    const [totalFloors, setTotalFloors] = useState(15);

    const handleModalSubmit = () => {
        setModalOpen(false);
    };

    return (
        <>
            {modalOpen ? (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Enter Building Details</h2>
                        <label>
                            Total Floors:
                            <input
                                type="number"
                                value={totalFloors}
                                onChange={(e) => setTotalFloors(parseInt(e.target.value))}
                            />
                        </label>
                        <button onClick={handleModalSubmit}>Submit</button>
                    </div>
                </div>
            ) : null}
            <Building totalFloors={totalFloors} />
        </>
    );
};

export default ElevatorApp;
