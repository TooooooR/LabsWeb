import React from "react";
import Tree from "../../images/crismas-Tree.jpg"
import "./Catalog.css";
import Card from "./Card";

function Catalog(props) {
    return (
        <div className="wrapper">
            {props.trees.map((tree) => (
                <Card tree = {tree}/>
            ))}
        </div>
    );
}

export default Catalog;
