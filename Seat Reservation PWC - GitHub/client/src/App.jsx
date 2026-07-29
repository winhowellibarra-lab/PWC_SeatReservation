import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import FloorMapView from './components/FloorMapView.jsx';
import AdminView from './components/AdminView.jsx';
import dayjs from 'dayjs';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <div className="app">
      <Toaster position="top-right" />
      <Header selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<FloorMapView selectedDate={selectedDate} />} />
          <Route path="/admin" element={<AdminView selectedDate={selectedDate} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
