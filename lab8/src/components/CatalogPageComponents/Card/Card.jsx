import React from "react";
import Tree from "../../../images/crismas-Tree.jpg"
import "./Card.css";
import { NavLink } from "react-router-dom";
import ButtonViewMore from "../../Buttons/ButtonViewMore/ButtonViewMore.jsx";

function Card(props) {
    return (
        <div class="card_of_tree">
            <img src={Tree} alt="crismasTree" className="place_for_img" />
            <h4>Виробник {props.tree.manufacturer_name}</h4>
            <p>Height: {props.tree.height_cm} cm</p>
            <p>Price: {props.tree.price} UAH</p>
            <p>Material: {props.tree.material}</p>
            <NavLink to={`/tree/${props.tree.id}`} className='bot'>
                <ButtonViewMore div = 'viewbtn' btn = 'viewmorebtn' name = 'View'/>
            </NavLink>
        </div>
    );
}

export default Card;
