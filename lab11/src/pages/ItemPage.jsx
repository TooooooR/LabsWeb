import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTreeById } from "../api";
import { addToCart } from "../cartRedux/actions";
import Price from "../components/ItemPageComponents/PriceSection/PriceSection";
import MainSection from "../components/ItemPageComponents/MainSection/MainSection";
import Loader from "../components/Loader/Loader";
import ModalWindow from "../components/ModalWindow/ModalWindow.jsx";

function ItemPage() {
    const { id } = useParams();
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedHeight, setSelectedHeight] = useState(null);
    const [selectQuantity, setSelectQuantity] = useState(1);
    const [modalMessage, setModalMessage] = useState(null);

    let price = 0

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTree = async () => {
            try {
                setLoading(true);
                const fetchedTree = await getTreeById(id);
                setTree(fetchedTree);
                setSelectedHeight(fetchedTree.height_cm);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchTree();
    }, [id]);

    const handleAddToCart = () => {
        const cartItem = {
            id: tree.id,
            manufacturer_name: tree.manufacturer_name,
            height_cm: selectedHeight,
            price: price,
            quantity: Number(selectQuantity),
        };
        dispatch(addToCart(cartItem));
        setModalMessage("Item successfully added to the cart!");
    };
    

    if (loading) return <Loader loading={loading} />;


    if (tree.height_cm + 20 == selectedHeight)
        price = tree.price + 500
    else if (tree.height_cm + 40 == selectedHeight)
        price = tree.price + 1000
    else
        price = tree.price

    return (
        <div>
            <MainSection
                manufacturer_name={tree.manufacturer_name}
                material={tree.material}
                height_cm={selectedHeight}
                trueH={tree.height_cm}
                setHeight={setSelectedHeight}
                selectQuantity={selectQuantity}
                setSelectQuantity={setSelectQuantity}
            />
            <Price price={price} onAddToCart={handleAddToCart} />

            {modalMessage && (
                <ModalWindow 
                    message={modalMessage} 
                    onClose={() => setModalMessage(null)} 
                />
            )}
        </div>
    );
}

export default ItemPage;
