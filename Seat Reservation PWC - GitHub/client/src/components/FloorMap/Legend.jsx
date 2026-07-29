import './Legend.css';

function Legend({ zones }) {
  return (
    <div className="legend">
      <div className="legend-section">
        <h4>Teams</h4>
        <div className="legend-items">
          {zones.map(zone => (
            <div key={zone.id} className="legend-item">
              <span className="legend-swatch" style={{ background: zone.color }} />
              <span className="legend-label">{zone.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="legend-section">
        <h4>Status</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-swatch" style={{ background: '#83CCEB' }} />
            <span className="legend-label">Available</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch" style={{ background: '#9CA3AF' }} />
            <span className="legend-label">Booked</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch" style={{ background: '#10B981' }} />
            <span className="legend-label">Your booking</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legend;
