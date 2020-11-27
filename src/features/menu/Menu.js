import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // probably temporarily here
import { parameterRefreshAll } from '../timbre/parameters/parameterSlice'; // probably temporarily here
import logo from '../../1f3b9.svg';
import './Menu.css';

// for things such as (do you want to save? or do you want to reset things?)
const Modal = ({ show, handleSave, handleNoSave, handleClose }) => {
    const modalDisplay = show ? 'modal modal-display' : 'modal modal-hide';
    return (
        <div className={modalDisplay}>
            <div className="modal-main">
                <span className="modal-header">Save Changes</span>
                <span className="modal-text">
                    Do you want to save your changes?
                </span>
                <button
                    className="menu-button button-save"
                    onClick={handleSave}>
                    Save Changes
                </button>
                <button
                    className="menu-button button-no-save"
                    onClick={handleNoSave}>
                    Don't Save
                </button>
                <button
                    className="menu-button button-cancel"
                    onClick={handleClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default function MainMenu() {
    const unsaved = useSelector((state) => state.parameters.unsaved);
    const [open, setOpen] = useState({
        className: '',
        openState: true,
    });
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const HandleClick = () => {
        setOpen({
            className: open.openState
                ? 'menu-true-animation'
                : 'menu-false-animation',
            openState: !open.openState,
        });
    };

    const AnimationEnd = () => {
        setOpen({
            ...open,
            className: `menu-${open.openState}`,
        });
    };

    const modalState = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <Modal
                show={showModal}
                handleClose={modalState}
                handleSave={() => {
                    modalState();
                    HandleClick(); // temporary while I implement the binary parsing stuff
                }}
                handleNoSave={() => {
                    dispatch(parameterRefreshAll());
                    modalState();
                    HandleClick();
                }}
            />
            <div
                className={`menu ${open.className}`}
                onAnimationEnd={AnimationEnd}>
                <img src={logo} className="menu-logo" alt="logo" />
                <header className="menu-title">
                    <h1>Alapatch</h1>
                    <h2>A microKORG Patch Editor</h2>
                </header>
                <div className="menu-button-container">
                    <button
                        className="menu-button"
                        onClick={() => {
                            !unsaved ? HandleClick() : modalState();
                        }}>
                        New Patch
                    </button>
                    <button className="menu-button">Load Patch</button>
                </div>
            </div>

            <button className="menu-open-button" onClick={HandleClick} />
        </div>
    );
}
