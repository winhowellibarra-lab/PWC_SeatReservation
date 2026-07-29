function Zone({ zone, bounds }) {
  return (
    <g>
      <rect
        x={bounds.x}
        y={bounds.y}
        width={bounds.w}
        height={bounds.h}
        fill={zone.color}
        fillOpacity={0.1}
        stroke="#aaa"
        strokeWidth="1.5"
        rx="6"
      />
      <text
        x={bounds.x + bounds.w / 2}
        y={bounds.y + bounds.h + 20}
        fontSize="14"
        fill="#333"
        fontWeight="700"
        textAnchor="middle"
      >
        {zone.name}
      </text>
    </g>
  );
}

export default Zone;
