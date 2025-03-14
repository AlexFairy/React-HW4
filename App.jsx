import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './24. L3 & L4 HW/Home';
import BrowseCharacters from './24. L3 & L4 HW/BrowseCharacters';
import CharacterDetail from './24. L3 & L4 HW/ChracterDetail';
import Comics from './24. L3 & L4 HW/Comics';
import NavigationBar from './24. L3 & L4 HW/NavigationBar';
import NotFound from './24. L3 & L4 HW/NotFound';

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-characters" element={<BrowseCharacters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/character/:id/comics" element={<Comics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;