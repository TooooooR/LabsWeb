import React from 'react'
import './Card.css';
import Tree from "../../../images/crismas-Tree.jpg"
import TemplateButtons from '../../Buttons/TemplateButtons/TemplateButtons';
import { useDispatch } from 'react-redux';
import { increment, decrement, removeFromCart } from '../../../cartRedux/actions';

function Card(props) {
    const dispatch = useDispatch();

    const handleIncrement = () => {
      dispatch(increment(props.tree.id, props.tree.height_cm));
    };
  
    const handleDecrement = () => {
      dispatch(decrement(props.tree.id, props.tree.height_cm));
    };

    const handleRemove = () => {
      dispatch(removeFromCart(props.tree.id, props.tree.height_cm));
    };
    
  return (
    <div class="card_of_tree_cart">
        <img src={Tree} alt="crismasTree" className="place_for_img_cart" />
        <div className='carrtInfo'>
            <div className='blocc'>
                <h4>Виробник: {props.tree.manufacturer_name}</h4>
                <p>Висота: {props.tree.height_cm} cm</p>
            </div>
            <p className='plusminus'> 
                <TemplateButtons onClick={handleDecrement} id = 'plusminus' type = '-' />
                {props.tree.quantity}
                <TemplateButtons onClick={handleIncrement} id = 'plusminus' type = '+' />
            </p>
            <div className='priceANDdelete'>
                <p className='prr'>{props.tree.price} UAH</p>
                <TemplateButtons onClick={handleRemove} id = 'plusminus' type = '&times;' />
            </div>
        </div>
    </div>
  )
}

export default Card