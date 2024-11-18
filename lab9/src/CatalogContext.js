import React, { createContext, useState, useEffect } from 'react';
import { trees } from './data/dataCatalog';

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [visibleTrees, setVisibleTrees] = useState(9);
  const [filteredTrees, setFilteredTrees] = useState(trees);
  const [searchValue, setSearchValue] = useState('');

  //кнопка "Show More"
  const handleViewMore = () => {
    setVisibleTrees((prevVisible) => prevVisible + 9);
  };

  //сортування по зростанню і спаданню ціни
  const handleSortDecreasePrice = () => {
    const sortedTrees = [...filteredTrees].sort((a, b) => b.price - a.price);
    setFilteredTrees(sortedTrees);
  };

  const handleSortIncreasePrice = () => {
    const sortedTrees = [...filteredTrees].sort((a, b) => a.price - b.price);
    setFilteredTrees(sortedTrees);
  };

  const handleSortDecreaseHeight = () => {
    const sortedTrees = [...filteredTrees].sort((a, b) => b.height_cm - a.height_cm);
    setFilteredTrees(sortedTrees);
  };

  const handleSortIncreaseHeight = () => {
    const sortedTrees = [...filteredTrees].sort((a, b) => a.height_cm - b.height_cm);
    setFilteredTrees(sortedTrees);
  };

  //пошук
  useEffect(() => {
    const updatedTrees = trees.filter(tree =>
      tree.manufacturer_name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setFilteredTrees(updatedTrees);
  }, [searchValue]);

  //кнопка Reset
  const handleReset = () => {
    setSearchValue('');
    setVisibleTrees(9);
    setFilteredTrees(trees);
  };

  const visibleFilteredTrees = filteredTrees.slice(0, visibleTrees);

  return (
    <CatalogContext.Provider
      value={{
        visibleTrees,
        setVisibleTrees,
        filteredTrees,
        searchValue,
        setSearchValue,
        handleSortDecreasePrice,
        handleSortIncreasePrice,
        handleSortIncreaseHeight,
        handleSortDecreaseHeight,
        handleReset,
        handleViewMore,
        visibleFilteredTrees
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
