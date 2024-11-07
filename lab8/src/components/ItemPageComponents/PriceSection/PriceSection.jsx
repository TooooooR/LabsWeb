import React from "react";
import TemplateButtons from "../../Buttons/TemplateButtons/TemplateButtons.jsx";
import './PriceSection.css';
import ButtonGoBack from "../ButtonGoBack/ButtonGoBack";

function PriceSection(props) {
    return (
        <div className="priceWrapper">
            <p className="price">Ціна: {props.price} UAH</p>
            <div className="btns">
                <ButtonGoBack />
                <TemplateButtons id = 'sort_by_of_price' type = 'Add to cart' />
            </div>
        </div>
    );
}

export default PriceSection;
