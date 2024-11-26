import React from 'react';
import GreenMark from '../../images/greenmark.png';
import './ModalWindow.css';

function ModalWindow({ message, onClose }) {
    const handleClickOutside = (event) => {
        if (event.target.className === "modal") {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
                <img src={GreenMark} alt="GreenMark" className="error_img" />
                <div className="modal-message_and-close">
                    <p id="modalMessage">{message}</p>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;
