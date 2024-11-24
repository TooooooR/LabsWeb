import React, { useState, useEffect } from 'react';
import Catalog from '../components/CatalogPageComponents/Catalog/Catalog.jsx';
import SearchAndSortSection from '../components/SearchAndSortSection/SearchAndSortSection.jsx';
import ButtonViewMore from '../components/Buttons/ButtonViewMore/ButtonViewMore.jsx';
import Loader from '../components/Loader/Loader';
import { getAllTrees, getSortTrees, searchTrees } from '../api.js';

function CatalogPage() {
  const [visibleTrees, setVisibleTrees] = useState(9);
  const [trees, setTrees] = useState([]);
  const [filteredTrees, setFilteredTrees] = useState(trees);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState('');
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
          setLoading(false);
        }, 500);
      }
    };
    fetchTrees();
  }, []);

  useEffect(() => {
    const sortTrees = async () => {
      if (sortType === '') return;
      try {
        setLoading(true);
        const sortedtr = await getSortTrees(sortType, searchValue);
        setFilteredTrees(sortedtr);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    sortTrees();
  }, [sortType]);

  useEffect(() => {
    const fetchUpdatedTrees = async () => {
      try {
        setLoading(true);
        let updatedTrees;
  
        if (sortType) {
          updatedTrees = await getSortTrees(sortType, searchValue);
        } else {
          updatedTrees = await searchTrees(searchValue);
        }
  
        setFilteredTrees(updatedTrees);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
  
    fetchUpdatedTrees();
  }, [searchValue]);
  


  useEffect(() => {
    if (!loading) {
      const inputElement = document.getElementById('find_input');
      if (inputElement) inputElement.focus();
    }
  }, [loading]);


  const handleReset = () => {
    setSearchValue('');
    setVisibleTrees(9);
    setFilteredTrees(trees);
  };

  const handleViewMore = () => {
    setVisibleTrees((prevVisible) => prevVisible + 9);
  };

  const visibleFilteredTrees = filteredTrees.slice(0, visibleTrees);

  if (loading) return <Loader loading={loading} />;

  return (
    <div>
      <SearchAndSortSection 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleReset={handleReset}
        setSortType={setSortType}
        sortType={sortType}
      />
      <Catalog trees={visibleFilteredTrees} />
      {visibleTrees < filteredTrees.length && (
        <ButtonViewMore name="Show" onClick={handleViewMore} />
      )}
    </div>
  );
}

export default CatalogPage;
