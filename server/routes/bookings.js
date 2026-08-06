import { Router } from 'express';
import { getDb } from '../db/database.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const { date, user } = req.query;

  if (user) {
    const bookings = db.prepare(`
      SELECT b.*, s.seat_label, z.name as zone_name, z.color as zone_color
      FROM bookings b
      JOIN seats s ON b.seat_id = s.id
      LEFT JOIN zones z ON s.zone_id = z.id
      WHERE LOWER(b.booked_by) = LOWER(?)
      ORDER BY b.booking_date DESC
    `).all(user);
    return res.json(bookings);
  }

  if (date) {
    const bookings = db.prepare(`
      SELECT b.*, s.seat_label, z.name as zone_name, z.color as zone_color
      FROM bookings b
      JOIN seats s ON b.seat_id = s.id
      LEFT JOIN zones z ON s.zone_id = z.id
      WHERE b.booking_date = ?
      ORDER BY s.seat_label
    `).all(date);
    return res.json(bookings);
  }

  res.status(400).json({ error: 'Provide date or user query parameter' });
});

router.post('/', (req, res) => {
  const { seat_id, booked_by, booking_date, notes } = req.body;

  if (!seat_id || !booked_by || !booking_date) {
    return res.status(400).json({ error: 'seat_id, booked_by, and booking_date are required' });
  }

  const db = getDb();

  const seat = db.prepare('SELECT * FROM seats WHERE id = ? AND is_active = 1').get(seat_id);
  if (!seat) {
    return res.status(404).json({ error: 'Seat not found or inactive' });
  }

  try {
    const result = db.prepare(
      'INSERT INTO bookings (seat_id, booked_by, booking_date, notes) VALUES (?, ?, ?, ?)'
    ).run(seat_id, booked_by.trim(), booking_date, notes || null);

    const booking = db.prepare(`
      SELECT b.*, s.seat_label
      FROM bookings b
      JOIN seats s ON b.seat_id = s.id
      WHERE b.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(booking);
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: `Seat ${seat.seat_label} is already booked on ${booking_date}` });
    }
    throw err;
  }
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  const result = db.prepare('DELETE FROM bookings WHERE id = ?').run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json({ message: 'Booking cancelled' });
});

export default router;
