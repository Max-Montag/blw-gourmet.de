import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import AddRecipe from './views/admin/AddRecipe';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/add-recipe/" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
