function Seat({ seat, isSelected, isOwnBooking, onClick, onMouseEnter, onMouseLeave }) {
  let fill;
  if (isOwnBooking) {
    fill = '#10B981';
  } else if (seat.status === 'booked') {
    fill = '#9CA3AF';
  } else {
    fill = seat.zone_color || '#6B7280';
  }

  const stroke = isSelected ? '#000' : '#555';
  const strokeWidth = isSelected ? 2 : 0.5;
  const cursor = seat.status === 'booked' && !isOwnBooking ? 'default' : 'pointer';
  const size = 24;

  const labelParts = seat.seat_label.split('-');
  const seatNum = labelParts[labelParts.length - 1].replace(/[A-Za-z]/g, '') || labelParts[labelParts.length - 1];

  return (
    <g
      style={{ cursor }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <rect
        x={seat.x - size / 2}
        y={seat.y - size / 2}
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        rx="3"
      />
      <text
        x={seat.x}
        y={seat.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {seatNum}
      </text>
    </g>
  );
}

export default Seat;
