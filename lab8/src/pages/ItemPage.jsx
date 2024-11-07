import React from "react";
import { useParams } from "react-router-dom";
import { trees } from "../data/dataCatalog";
import Price from "../components/ItemPageComponents/PriceSection/PriceSection";
import MainSection from "../components/ItemPageComponents/MainSection/MainSection";

function ItemPage() {
    const { id } = useParams();
    const tree = trees.find(tree => tree.id === parseInt(id));

    return (
        <div>
            <MainSection 
                manufacturer_name = {tree.manufacturer_name} 
                height_cm = {tree.height_cm} 
                material = {tree.material}
            />
            <Price price = {tree.price} />
        </div>
    );
}

export default ItemPage;
