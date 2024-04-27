import React from 'react';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'carList':
        return <CarList />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <header>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('carList')}>Car List</button>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
}

function CarList() {
  return (
    <div>
      <h1>Car List</h1>
      <p>This is the Car List page.</p>
    </div>
  );
}

export default App;
