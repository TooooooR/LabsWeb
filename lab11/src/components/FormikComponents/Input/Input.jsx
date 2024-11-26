import React from 'react';
import { Field } from 'formik';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import './Input.css';

function Input({ id, label, name, placeholder }) {
    return (
        <div className="input-container">
            <label htmlFor={id} className="input-label">{label}</label>
            <Field name={name} id={id} placeholder={placeholder} className="input-field" />
            <ErrorMessage name={name} />
        </div>
    );
}

export default Input;
