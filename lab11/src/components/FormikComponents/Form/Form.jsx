import React from 'react';
import { Formik, Form } from 'formik';
import { initValues, schemas } from '../initialValues.js';
import Input from '../Input/Input.jsx';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import TemplateButtons from '../../Buttons/TemplateButtons/TemplateButtons.jsx';
import { useDispatch } from 'react-redux';
import { clearALL } from '../../../cartRedux/actions.js';

function CustomForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleSubmit = (values) => {
        console.log(values);
        navigate('/cart/success'); 
        dispatch(clearALL());
    };

    const handleNavigate = () => {
        navigate(-1);
    }

    return (
        <>
            <h1 className='checkOUTh1'>Checkout</h1>

            <Formik initialValues={initValues} validationSchema={schemas.custom} onSubmit={handleSubmit}>
                    <Form className="custom-form">
                        <Input 
                            label="Ім'я"
                            name="firstname"
                            id="firstname"
                            placeholder="Введіть ім'я"
                        />
                        <Input 
                            label="Прізвище"
                            name="lastname"
                            id="lastname"
                            placeholder="Введіть прізвище"
                        />
                        <Input 
                            label="Електронна пошта"
                            name="email"
                            id="email"
                            placeholder="Введіть email"
                        />
                        <Input 
                            label="Номер телефону"
                            name="phone"
                            id="phone"
                            placeholder="Введіть номер телефону"
                        />
                        <Input 
                            label="Адреса"
                            name="address"
                            id="address"
                            placeholder="Введіть адресу"
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </Form>
            </Formik>

            <div className='navButtonsCartt'>
                <TemplateButtons id = 'sort_by_of_pricee' type = 'Go Back' onClick={handleNavigate} />
            </div>
        </>
    );
}

export default CustomForm;
