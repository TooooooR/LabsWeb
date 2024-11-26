import React, { useState, useEffect } from 'react';
import Catalog from '../components/CatalogPageComponents/Catalog/Catalog.jsx';
import HeroSection from '../components/HomePageComponents/HeroSection/HeroSection.jsx';
import ButtonViewMore from '../components/Buttons/ButtonViewMore/ButtonViewMore.jsx';
import { getAllTrees } from '../api.js';
import Loader from '../components/Loader/Loader.jsx';

function Home() {
  const [visibleTrees, setVisibleTrees] = useState(9);
  const [trees, setTrees] = useState([]);
  const [filteredTrees, setFilteredTrees] = useState(trees);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true);
        const allTrees = await getAllTrees();
        setTrees(allTrees);
        setFilteredTrees(allTrees);
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    };
    fetchTrees();
  }, []);


  const handleViewMore = () => {
    setVisibleTrees((prevVisible) => prevVisible + 9);
  };


  const visibleFilteredTrees = filteredTrees.slice(0, visibleTrees);

  return (
    <div className="App">
      <HeroSection />

      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <Catalog trees={visibleFilteredTrees} />
          {visibleTrees < trees.length && ( <ButtonViewMore name='Show' onClick={handleViewMore} /> )}
        </>
      )}
    </div>
  );
}

export default Home;
