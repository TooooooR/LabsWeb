import React from 'react';
import "./Catalog.css";
import Card from "../Card/Card.jsx";

function Catalog({ trees }) {
    return (
        <>
            <div className="wrapper">
                {trees.map((tree) => (
                    <Card key={tree.id} tree={tree} />
                ))}
            </div>
        </>
    );
}

export default Catalog;
