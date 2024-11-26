import React from "react";
import './SortSelection.css';

function SortSelection({ onChange, sortType }) {
    return (
        <div className="sortWrapper">
            <h3>Sort by</h3>
            <div className="sortButtons">
                <select id="sort_by_price" onChange={onChange} value={sortType}>
                    <option value="">Choose your sorting</option>
                    <option value="price_asc">Sort by price increase</option>
                    <option value="price_desc">Sort by price decrease</option>
                    <option value="height_asc">Sort by height increase</option>
                    <option value="height_desc">Sort by height decrease</option>
                </select>
            </div>
        </div>  
    );
}

export default SortSelection;
