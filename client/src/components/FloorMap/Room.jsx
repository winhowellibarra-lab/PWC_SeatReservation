function Room({ room }) {
  return (
    <g>
      <rect
        x={room.x}
        y={room.y}
        width={room.width}
        height={room.height}
        fill="#fff"
        stroke="#333"
        strokeWidth="1"
      />
      <text
        x={room.x + room.width / 2}
        y={room.y + room.height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="6.5"
        fill="#1a1a1a"
        fontWeight="500"
      >
        {room.name}
      </text>
    </g>
  );
}

export default Room;
