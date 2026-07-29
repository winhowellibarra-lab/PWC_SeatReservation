import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ selectedDate, onDateChange }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-brand">
        <h1 className="header-title">PwC Manila 11F</h1>
        <span className="header-subtitle">Seat Reservation</span>
      </div>
      <div className="header-controls">
        <input
          type="date"
          className="header-date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
        <nav className="header-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Map
          </Link>
          <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
