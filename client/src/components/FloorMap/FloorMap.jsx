import { useState } from 'react';
import { ZONE_BOUNDS } from './mapData.js';
import Seat from './Seat.jsx';
import Zone from './Zone.jsx';
import Legend from './Legend.jsx';
import './FloorMap.css';

function FloorMap({ seats, zones, rooms, selectedSeat, onSeatClick }) {
  const [tooltip, setTooltip] = useState(null);
  const userName = localStorage.getItem('seatReservationUser') || '';

  return (
    <div className="floor-map-container">
      <div className="floor-map-scroll">
        <svg
          viewBox="0 0 4580 680"
          className="floor-map-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Zone backgrounds */}
          {zones.map(zone => {
            const bounds = ZONE_BOUNDS[zone.id];
            if (!bounds) return null;
            return <Zone key={zone.id} zone={zone} bounds={bounds} />;
          })}

          {/* Seats */}
          {seats.map(seat => (
            <Seat
              key={seat.id}
              seat={seat}
              isSelected={selectedSeat?.id === seat.id}
              isOwnBooking={seat.booked_by && seat.booked_by.toLowerCase() === userName.toLowerCase()}
              onClick={() => onSeatClick(seat)}
              onMouseEnter={(e) => setTooltip({ seat, x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </svg>
      </div>

      {/* Tooltip overlay */}
      {tooltip && (
        <div
          className="seat-tooltip"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
        >
          <strong>{tooltip.seat.seat_label}</strong>
          <span>{tooltip.seat.zone_name || 'Unassigned'}</span>
          <span>
            {tooltip.seat.status === 'booked'
              ? `Booked: ${tooltip.seat.booked_by}`
              : 'Available'}
          </span>
          {tooltip.seat.has_monitor ? <span>Monitor available</span> : null}
        </div>
      )}

      <Legend zones={zones} />
    </div>
  );
}

export default FloorMap;
