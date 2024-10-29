import React from "react";
import "./Catalog.css";
import Card from "./Card";

function Catalog(props) {
    return (
        <div className="wrapper">
            {props.trees.map((tree) => (
                <Card key ={tree.id} tree = {tree}/>
            ))}
        </div>
    );
}

export default Catalog;
