import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // CSS dosyasını import edin

function CarList() {
  // Araçları saklamak için bir state tanımlayalım
  const [cars, setCars] = useState([]);
  // Filtreleme için plaka numarası state'i
  const [plateFilter, setPlateFilter] = useState('');

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

  // Plakaya göre filtreleme işlevi
  const filterCarsByPlate = (plate) => {
    if (!plate) {
      // Eğer filtre boşsa, tüm araçları göster
      return cars;
    } else {
      // Eğer filtre doluysa, plakaya göre araçları filtrele
      return cars.filter((car) =>
        car.plateNumber.toLowerCase().includes(plate.toLowerCase())
      );
    }
  };

  // Filtreleme işlemini gerçekleştiren fonksiyonu çağırın
  const filteredCars = filterCarsByPlate(plateFilter);

  return (
    <div className="car-list-container">
      <h1>Araç Listesi</h1>
      {/* Plaka filtreleme giriş alanı */}
      <input
        type="text"
        placeholder="Plaka numarası girin..."
        value={plateFilter}
        onChange={(e) => setPlateFilter(e.target.value)}
      />
      <ul>
        {/* Filtrelenmiş araçları listeleyin */}
        {filteredCars.map((car) => (
          <li key={car.id}>
            <p>Plaka: {car.plateNumber}</p>
            <p>Model Yılı: {car.modelYear}</p>
            <p>Muayene Tarihi: {car.inspectionDate}</p>
            <p>Ruhsat Fotoğrafı: <img src={car.permitImage} alt="Ruhsat Fotoğrafı" /></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
