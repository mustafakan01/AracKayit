import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css'; 

function CarForm() {
  const [plateNumber, setPlateNumber] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [inspectionDate, setInspectionDate] = useState(new Date());
  const [permitImage, setPermitImage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5097/api/Cars', {
        plateNumber,
        modelYear,
        inspectionDate,
        permitImage,
      });
      console.log('Başarıyla gönderildi:', response.data);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPermitImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="car-form-container">
      <h1>Araç Form</h1>
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
          <DatePicker
            id="inspectionDate"
            selected={inspectionDate}
            onChange={(date) => setInspectionDate(date)}
          />
        </div>
        <div>
          <label htmlFor="permitImage">Ruhsat Fotoğrafı:</label>
          <label htmlFor="file-upload" className="custom-file-upload">
            Dosya Seç
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
          />
          {permitImage && <img src={permitImage} alt="Ruhsat Fotoğrafı" />}
        </div>
        <button type="submit">Kaydet</button>
      </form>
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Araç başarıyla kaydedildi!</p>
          <button onClick={() => setShowSuccessPopup(false)}>Kapat</button>
        </div>
      )}
    </div>
  );
}

export default CarForm;
