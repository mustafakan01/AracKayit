import React, { useState } from 'react';
import Home from './components/Home';
import CarList from './components/CarList';
import CarForm from './components/CarForm';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'carList':
        return <CarList />;
      case 'carForm':
        return <CarForm />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <header>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('carList')}>Car List</button>
        <button onClick={() => setPage('carForm')}>Car Form</button>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
