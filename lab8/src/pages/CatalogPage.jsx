import React, { useContext } from 'react';
import { CatalogContext } from '../CatalogContext.js';
import Catalog from '../components/CatalogPageComponents/Catalog/Catalog.jsx';
import SearchAndSortSection from '../components/SearchAndSortSection/SearchAndSortSection.jsx';
import ButtonViewMore from '../components/Buttons/ButtonViewMore/ButtonViewMore.jsx';

function CatalogPage() {
  const {
    visibleTrees,
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
  } = useContext(CatalogContext);


  return (
    <div>
      <SearchAndSortSection 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSortDecreasePrice={handleSortDecreasePrice}
        handleSortIncreasePrice={handleSortIncreasePrice}
        handleReset={handleReset}
        handleSortIncreaseHeight={handleSortIncreaseHeight}
        handleSortDecreaseHeight={handleSortDecreaseHeight}
      />

      <Catalog trees={visibleFilteredTrees} />

      {visibleTrees < filteredTrees.length && (
        <ButtonViewMore name='Show' onClick={handleViewMore} />
      )}
    </div>
  );
}

export default CatalogPage;
