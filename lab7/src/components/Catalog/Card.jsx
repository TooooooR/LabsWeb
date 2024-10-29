import React from "react";
import Tree from "../../images/crismas-Tree.jpg"
import "./Catalog.css";

function Card(props) {
    return (
        <div class="card_of_tree">
            <img src={Tree} alt="crismasTree" className="place_for_img" />
            <h4>Виробник {props.tree.manufacturer_name}</h4>
            <p>Height: {props.tree.height_cm} cm</p>
            <p>Price: {props.tree.price} UAH</p>
            <p>Material: {props.tree.material}</p>
            <div class="tree_edit_delete">
                {/* <button class="edit_button" data-id={item.id}>Edit</button>
                <button class="delete_button" data-id={item.id}>Delete</button> */}
            </div>
        </div>
    );
}

export default Card;
