import React from "react";
import './MainSection.css';
import Tree from '../../../images/crismas-Tree.jpg';

function MainSection(props) {
    return (
        <div className="mainsection">
            <img src={Tree} alt='tree' className="treeimg"/>
            <div className="description">
                <h2 className="mainDesc">Чудова ялинка від  виробника {props.manufacturer_name}</h2>
                <p className="moreInfo">Якісна штучна ялинка з реалістичними гілками, виготовлена з довговічних матеріалів. Легка у збиранні, створює затишну атмосферу свята.</p>
                <div className="height_material">
                    <div>
                        <p>Висота в см</p>
                        <select id="sort_by_price">
                            <option value="">{props.height_cm}</option>
                            <option value="">200</option>
                            <option value="">230</option>
                        </select>
                    </div>
                    
                    <div>
                        <p>Матеріал</p>
                        <select id="sort_by_price">
                            <option value="">{props.material}</option>
                            <option value="">PP</option>
                            <option value="">PVE</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSection;
