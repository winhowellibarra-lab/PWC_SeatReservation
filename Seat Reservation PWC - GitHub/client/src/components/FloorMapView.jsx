import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FloorMap from './FloorMap/FloorMap.jsx';
import BookingPanel from './BookingPanel/BookingPanel.jsx';
import { fetchSeatsAvailability, createBooking, cancelBooking } from '../api/bookings.js';
import './FloorMapView.css';

function FloorMapView({ selectedDate }) {
  const [seats, setSeats] = useState([]);
  const [zones, setZones] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  async function loadData() {
    setLoading(true);
    try {
      const [seatsData, zonesRes, roomsRes] = await Promise.all([
        fetchSeatsAvailability(selectedDate),
        fetch('/api/zones').then(r => r.json()),
        fetch('/api/rooms').then(r => r.json()),
      ]);
      setSeats(seatsData);
      setZones(zonesRes);
      setRooms(roomsRes);
    } catch (err) {
      toast.error('Failed to load floor data');
    } finally {
      setLoading(false);
    }
  }

  async function handleBook(seatId, name, notes) {
    try {
      await createBooking({ seat_id: seatId, booked_by: name, booking_date: selectedDate, notes });
      toast.success('Seat booked successfully!');
      setSelectedSeat(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Booking failed');
    }
  }

  async function handleCancel(bookingId) {
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled');
      setSelectedSeat(null);
      loadData();
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  }

  if (loading) {
    return <div className="floor-map-view loading">Loading floor plan...</div>;
  }

  return (
    <div className="floor-map-view">
      <FloorMap
        seats={seats}
        zones={zones}
        rooms={rooms}
        selectedSeat={selectedSeat}
        onSeatClick={setSelectedSeat}
      />
      {selectedSeat && (
        <BookingPanel
          seat={selectedSeat}
          onBook={handleBook}
          onCancel={handleCancel}
          onClose={() => setSelectedSeat(null)}
        />
      )}
    </div>
  );
}

export default FloorMapView;
