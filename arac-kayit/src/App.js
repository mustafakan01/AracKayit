import React, { useState } from 'react';
import Home from './components/Home';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import './components/style.css'

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
        <button onClick={() => setPage('home')}>Ana Sayfa</button>
        <button onClick={() => setPage('carList')}>Araç Listesi</button>
        <button onClick={() => setPage('carForm')}>Araç Form</button>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
