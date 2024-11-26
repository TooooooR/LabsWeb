import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import './ErrorMessage.css';

function ErrorMessage({ name }) {
    return (
        <FormikErrorMessage 
            name={name} 
            render={(message) => (
                <div className="error-message">
                    <p>{message}</p>
                </div>
            )}
        />
    );
}

export default ErrorMessage;
