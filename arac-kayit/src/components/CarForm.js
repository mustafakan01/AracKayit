import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; 

function CarForm() {
  const [plateNumber, setPlateNumber] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [permitImage, setPermitImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5097/api/Cars',
       {
        plateNumber,
        modelYear,
        inspectionDate,
        permitImage,
      });
      console.log('Başarıyla gönderildi:', response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div className="car-form-container">
      <h1>Car Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="plateNumber">Plaka:</label>
          <input
            type="text"
            id="plateNumber"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="modelYear">Model Yılı:</label>
          <input
            type="text"
            id="modelYear"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="inspectionDate">Muayene Tarihi:</label>
          <input
            type="text"
            id="inspectionDate"
            value={inspectionDate}
            onChange={(e) => setInspectionDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="permitImage">Ruhsat Fotoğrafı URL:</label>
          <input
            type="text"
            id="permitImage"
            value={permitImage}
            onChange={(e) => setPermitImage(e.target.value)}
          />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}

export default CarForm;
