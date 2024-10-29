import React from 'react';
import Catalog from '../components/Catalog/Catalog';
import { trees } from '../data/dataCatalog.js'
import FSR from '../components/FSR/FSR.jsx';
import View from '../components/View.jsx';

function CatalogPage() {
  return (
    <div>
      <FSR />
      <Catalog trees = {trees}/>
      <View />
    </div>
  );
}

export default CatalogPage;
