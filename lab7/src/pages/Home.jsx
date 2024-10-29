import React from 'react';
import Catalog from '../components/Catalog/Catalog.jsx'
import '../css/main.css'
import { trees } from '../data/dataCatalog.js'
import HeroSection from '../components/HeroSection/HeroSection.jsx';
import View from '../components/View.jsx';

function Home() {
  return (
    <div className="App">
      <HeroSection/>
      <Catalog trees = {trees}/>
      <View />
    </div>
  );
}

export default Home;
