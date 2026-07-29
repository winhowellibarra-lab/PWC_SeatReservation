CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_number TEXT,
    name TEXT NOT NULL,
    capacity INTEGER,
    room_type TEXT NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS workstation_areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    area_type TEXT NOT NULL,
    zone_id INTEGER,
    total_seats INTEGER NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
);

CREATE TABLE IF NOT EXISTS seats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seat_label TEXT NOT NULL,
    workstation_area_id INTEGER NOT NULL,
    zone_id INTEGER,
    has_monitor INTEGER DEFAULT 0,
    x REAL NOT NULL,
    y REAL NOT NULL,
    is_active INTEGER DEFAULT 1,
    FOREIGN KEY (workstation_area_id) REFERENCES workstation_areas(id),
    FOREIGN KEY (zone_id) REFERENCES zones(id)
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seat_id INTEGER NOT NULL,
    booked_by TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    notes TEXT,
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE(seat_id, booking_date)
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_seat_date ON bookings(seat_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_booked_by ON bookings(booked_by);
