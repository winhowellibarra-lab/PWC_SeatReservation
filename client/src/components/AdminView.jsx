import { useState, useEffect } from 'react';
import { fetchAdminStats, fetchAdminBookings } from '../api/bookings.js';
import './AdminView.css';

function AdminView({ selectedDate }) {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, [selectedDate]);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [statsData, bookingsData] = await Promise.all([
        fetchAdminStats(selectedDate),
        fetchAdminBookings(selectedDate),
      ]);
      setStats(statsData);
      setBookings(bookingsData);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = bookings.filter(b =>
    b.booked_by.toLowerCase().includes(filter.toLowerCase()) ||
    b.seat_label.toLowerCase().includes(filter.toLowerCase()) ||
    (b.zone_name || '').toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div className="admin-view loading">Loading...</div>;

  return (
    <div className="admin-view">
      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-value">{stats?.total_seats || 0}</span>
          <span className="stat-label">Total Seats</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.booked || 0}</span>
          <span className="stat-label">Booked</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats?.available || 0}</span>
          <span className="stat-label">Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {stats?.total_seats ? Math.round((stats.booked / stats.total_seats) * 100) : 0}%
          </span>
          <span className="stat-label">Occupancy</span>
        </div>
      </div>

      <div className="admin-table-section">
        <div className="table-header">
          <h3>Bookings for {selectedDate}</h3>
          <input
            type="text"
            placeholder="Filter by name, seat, or zone..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />
        </div>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Seat</th>
              <th>Zone</th>
              <th>Booked By</th>
              <th>Notes</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="5" className="no-data">No bookings found</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b.id}>
                  <td>{b.seat_label}</td>
                  <td>
                    <span className="zone-badge" style={{ background: b.zone_color }}>
                      {b.zone_name}
                    </span>
                  </td>
                  <td>{b.booked_by}</td>
                  <td>{b.notes || '—'}</td>
                  <td>{new Date(b.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminView;
