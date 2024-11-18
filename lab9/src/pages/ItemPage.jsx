import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTreeById } from "../api";
import Price from "../components/ItemPageComponents/PriceSection/PriceSection";
import MainSection from "../components/ItemPageComponents/MainSection/MainSection";
import Loader from "../components/Loader/Loader";

function ItemPage() {
    const { id } = useParams();
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTree = async () => {
            try {
                setLoading(true)
                const fetchedTree = await getTreeById(id);
                setTree(fetchedTree);
            } finally {
                setTimeout(() => {
                    setLoading(false)
                  }, 500)
            }
        };

        fetchTree();
    }, [id]);

    if (loading) return <Loader loading={loading} />;

    return (
        <div>
            <MainSection 
                manufacturer_name={tree.manufacturer_name} 
                height_cm={tree.height_cm} 
                material={tree.material}
            />
            <Price price={tree.price} />
        </div>
    );
}

export default ItemPage;
