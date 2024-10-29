import React from "react";
import InputFind from "./InputFind";
import './operation.css';
import ButtonFSR from "./ButtonFRS";
import Select from "./Select";

function FSR() {
    return (
        <div className="operationWrapper">
            <div className="findReset">
                <h3>Enter the manufacturer of the Christmas tree</h3>
                <div className="inputFindResetButtons">
                    <InputFind />
                    <div className="findResetButtons">
                        <ButtonFSR id = 'find_button' type = 'Find' />
                        <ButtonFSR id = 'reset_button' type = 'Reset' />
                    </div>
                </div>
            </div>

            <div className="sortWrapper">
                <h3>Sort by price</h3>
                <Select />
            </div>

        </div>
    );
}

export default FSR;
