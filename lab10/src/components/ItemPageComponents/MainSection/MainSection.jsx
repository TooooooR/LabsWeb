import React from "react";
import "./MainSection.css";
import Tree from "../../../images/crismas-Tree.jpg";
import InputFind from "../../SearchAndSortSection/InputFind/InputFind";

function MainSection({ manufacturer_name, height_cm, setHeight, material, selectQuantity, setSelectQuantity, trueH}) {
    let hplus20 = trueH + 20
    let hplus40 = trueH + 40

    return (
        <div className="mainsection">
            <img src={Tree} alt="tree" className="treeimg" />
            <div className="description">
                <h2 className="mainDesc">Чудова ялинка від виробника {manufacturer_name}</h2>
                <p className="moreInfo">Якісна штучна ялинка з реалістичними гілками, виготовлена з довговічних матеріалів. Легка у збиранні, створює затишну атмосферу свята. Матеріал ялинки {material}.</p>
                <div className="height_material">
                    <div className="ItemInfoSelection">
                        <p>Висота в см</p>
                        <select
                            id="sort_by_price"
                            value={height_cm}
                            onChange={(e) => setHeight(e.target.value)}
                        >
                            <option value={trueH}>{trueH}</option>
                            <option value={hplus20}>{hplus20}</option>
                            <option value={hplus40}>{hplus40}</option>
                        </select>
                    </div>

                    <div className="ItemInfoSelection">
                        <p>Кількість ялинок</p>
                        <InputFind 
                            id="find_input" 
                            type="number"
                            placeholder="Enter amount of trees"
                            min={1}
                            value={selectQuantity}
                            onChange={(e) => setSelectQuantity(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSection;
