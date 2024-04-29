import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // CSS dosyasını import edin

function CarList() {
  // Araçları saklamak için bir state tanımlayalım
  const [cars, setCars] = useState([]);
  // Filtreleme için plaka numarası state'i
  const [plateFilter, setPlateFilter] = useState('');
  // Düzenleme modu için state
  const [editMode, setEditMode] = useState(false);
  // Düzenlenen aracın bilgilerini saklamak için state'ler
  const [editedCar, setEditedCar] = useState({});
  
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

  // Araç silme işlevi
  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5097/api/Cars/${id}`);
      // Silinen aracı listeden kaldırın
      setCars(cars.filter((car) => car.id !== id));
      console.log('Araç başarıyla silindi');
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  // Düzenleme işlevi
  const handleEditCar = (car) => {
    setEditMode(true);
    setEditedCar(car);
  };

  // Düzenleme modunu kapatma işlevi
  const handleCloseEditMode = () => {
    setEditMode(false);
    setEditedCar({});
  };

  // Araç düzenleme işlevi
  const handleSaveEditedCar = async () => {
    try {
      await axios.put(`http://localhost:5097/api/Cars/${editedCar.id}`, editedCar);
      // Araçlar listesini güncelle
      const updatedCars = cars.map((car) => (car.id === editedCar.id ? editedCar : car));
      setCars(updatedCars);
      console.log('Araç başarıyla güncellendi');
      setEditMode(false); // Düzenleme modunu kapat
      setEditedCar({}); // Düzenlenen aracı sıfırla
    } catch (error) {
      console.error('Hata:', error);
    }
  };

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
            <button onClick={() => handleEditCar(car)}>Düzenle</button>
            <button className='delete-button' onClick={() => handleDeleteCar(car.id)}>Sil</button>
          </li>
        ))}
      </ul>
      
      {/* Düzenleme modu */}
      {editMode && (
        <div className="edit-modal">
          <h2>Düzenleme Ekranı</h2>
          {/* Düzenleme formu */}
          <form>
            <label htmlFor="plateNumber">Plaka:</label>
            <input
              type="text"
              id="plateNumber"
              value={editedCar.plateNumber}
              onChange={(e) => setEditedCar({...editedCar, plateNumber: e.target.value})}
            />
            <label htmlFor="modelYear">Model Yılı:</label>
            <input
              type="text"
              id="modelYear"
              value={editedCar.modelYear}
              onChange={(e) => setEditedCar({...editedCar, modelYear: e.target.value})}
            />
            <label htmlFor="inspectionDate">Muayene Tarihi:</label>
            <input
              type="text"
              id="inspectionDate"
              value={editedCar.inspectionDate}
              onChange={(e) => setEditedCar({...editedCar, inspectionDate: e.target.value})}
            />
            <label htmlFor="permitImage">Ruhsat Fotoğrafı URL:</label>
            <input
              type="text"
              id="permitImage"
              value={editedCar.permitImage}
              onChange={(e) => setEditedCar({...editedCar, permitImage: e.target.value})}
            />
            <button type="button" onClick={handleSaveEditedCar}>Kaydet</button>
            <button type="button" onClick={handleCloseEditMode}>Kapat</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CarList;
