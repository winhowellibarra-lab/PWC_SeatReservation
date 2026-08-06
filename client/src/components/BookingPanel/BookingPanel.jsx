import { useState, useEffect } from 'react';
import './BookingPanel.css';

function BookingPanel({ seat, onBook, onCancel, onClose }) {
  const [name, setName] = useState(() => localStorage.getItem('seatReservationUser') || '');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (name) localStorage.setItem('seatReservationUser', name);
  }, [name]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await onBook(seat.id, name.trim(), notes.trim() || null);
    setSubmitting(false);
    setNotes('');
  }

  async function handleCancel() {
    setSubmitting(true);
    await onCancel(seat.booking_id);
    setSubmitting(false);
  }

  const isBooked = seat.status === 'booked';
  const userName = localStorage.getItem('seatReservationUser') || '';
  const isOwnBooking = isBooked && seat.booked_by?.toLowerCase() === userName.toLowerCase();

  return (
    <div className="booking-panel">
      <div className="booking-panel-header">
        <h3>{seat.seat_label}</h3>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>

      <div className="booking-panel-info">
        <div className="info-row">
          <span className="info-label">Zone</span>
          <span className="info-value">
            <span className="zone-dot" style={{ background: seat.zone_color }} />
            {seat.zone_name || 'Unassigned'}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Area</span>
          <span className="info-value">{seat.area_name || '—'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Monitor</span>
          <span className="info-value">{seat.has_monitor ? 'Yes' : 'No'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Status</span>
          <span className={`info-value status-${seat.status}`}>
            {isBooked ? `Booked by ${seat.booked_by}` : 'Available'}
          </span>
        </div>
      </div>

      {!isBooked && (
        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="booking-input"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="booking-input"
          />
          <button type="submit" className="book-btn" disabled={submitting || !name.trim()}>
            {submitting ? 'Booking...' : 'Book This Seat'}
          </button>
        </form>
      )}

      {isOwnBooking && (
        <button className="cancel-btn" onClick={handleCancel} disabled={submitting}>
          {submitting ? 'Cancelling...' : 'Cancel Booking'}
        </button>
      )}
    </div>
  );
}

export default BookingPanel;
