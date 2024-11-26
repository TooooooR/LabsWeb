import React from 'react'
import Card from '../Card/Card.jsx';
import './ListOfCard.css';
import TemplateButtons from '../../Buttons/TemplateButtons/TemplateButtons.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function ListOfCard() {
    const cart = useSelector((state) => state.cart);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/catalog');
    }

    if (totalPrice === 0)
        return (
            <>
                <h1 className='empty'>Your shopping cart empty :(</h1>
                <div className='navButtonsCart'>
                    <TemplateButtons id = 'sort_by_of_pricee' type = 'Back to catalog' onClick={handleNavigate} />
                    <TemplateButtons id = 'sort_by_of_price' type = 'Continue' />
                </div>
            </>
        )

  return (
    <>
        <h1>Shopping Cart</h1>
        <div className="obhortka">
            {cart.map((item) => (
                <Card key={item.id} tree={item} />
            ))}
        </div>
        <p className='priceTotal'>Total price: {totalPrice} UAH</p>
        <div className='navButtonsCart'>
            <TemplateButtons id = 'sort_by_of_pricee' type = 'Back to catalog' onClick={handleNavigate} />
            <NavLink to='/cart/formik' className='sort_by_of_price'>Continue</NavLink>
        </div>
    </>
  )
}

export default ListOfCard