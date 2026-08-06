import { Router } from 'express';
import { getDb } from '../db/database.js';

const router = Router();

router.get('/stats', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'date query parameter is required' });
  }

  const db = getDb();

  const totalSeats = db.prepare('SELECT COUNT(*) as count FROM seats WHERE is_active = 1').get().count;
  const booked = db.prepare(
    'SELECT COUNT(*) as count FROM bookings WHERE booking_date = ?'
  ).get(date).count;

  const byZone = db.prepare(`
    SELECT z.name, z.color, COUNT(b.id) as booked_count,
      (SELECT COUNT(*) FROM seats WHERE zone_id = z.id AND is_active = 1) as total
    FROM zones z
    LEFT JOIN seats s ON s.zone_id = z.id AND s.is_active = 1
    LEFT JOIN bookings b ON b.seat_id = s.id AND b.booking_date = ?
    GROUP BY z.id
    ORDER BY z.name
  `).all(date);

  res.json({
    total_seats: totalSeats,
    booked,
    available: totalSeats - booked,
    by_zone: byZone,
  });
});

router.get('/bookings', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'date query parameter is required' });
  }

  const db = getDb();
  const bookings = db.prepare(`
    SELECT b.*, s.seat_label, z.name as zone_name, z.color as zone_color, wa.name as area_name
    FROM bookings b
    JOIN seats s ON b.seat_id = s.id
    LEFT JOIN zones z ON s.zone_id = z.id
    LEFT JOIN workstation_areas wa ON s.workstation_area_id = wa.id
    WHERE b.booking_date = ?
    ORDER BY s.seat_label
  `).all(date);

  res.json(bookings);
});

router.get('/zones', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM zones ORDER BY name').all());
});

export default router;
