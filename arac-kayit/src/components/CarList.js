import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarList() {
  // Araçları saklamak için bir state tanımlayalım
  const [cars, setCars] = useState([]);

  // Bileşen yüklendiğinde useEffect kullanarak API'den verileri alalım
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5097/api/Cars'); // Gerçek API URL'sini buraya yazın
        setCars(response.data); // API'den gelen verileri state'e yerleştirin
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchCars(); // Verileri almak için fonksiyonu çağırın
  }, []); // Boş bağımlılık dizisi, sadece bileşen yüklendiğinde çalışır

  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {/* Araçları listeleyin */}
        {cars.map((car) => (
          <li key={car.id}>
            <p>Plaka: {car.plateNumber}</p>
            <p>Model Yılı: {car.modelYear}</p>
            <p>Muayene Tarihi: {car.inspectionDate}</p>
            <p>Ruhsat Fotoğrafı: {car.permitImage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
