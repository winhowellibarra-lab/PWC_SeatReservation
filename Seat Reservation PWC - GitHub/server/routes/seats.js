import { Router } from 'express';
import { getDb } from '../db/database.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const seats = db.prepare(`
    SELECT s.*, z.name as zone_name, z.color as zone_color, wa.name as area_name
    FROM seats s
    LEFT JOIN zones z ON s.zone_id = z.id
    LEFT JOIN workstation_areas wa ON s.workstation_area_id = wa.id
    WHERE s.is_active = 1
  `).all();
  res.json(seats);
});

router.get('/availability', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'date query parameter is required' });
  }

  const db = getDb();
  const seats = db.prepare(`
    SELECT
      s.id, s.seat_label, s.x, s.y, s.has_monitor,
      z.name as zone_name, z.color as zone_color,
      wa.name as area_name,
      CASE WHEN b.id IS NOT NULL THEN 'booked' ELSE 'available' END as status,
      b.booked_by,
      b.id as booking_id,
      b.notes
    FROM seats s
    LEFT JOIN zones z ON s.zone_id = z.id
    LEFT JOIN workstation_areas wa ON s.workstation_area_id = wa.id
    LEFT JOIN bookings b ON s.id = b.seat_id AND b.booking_date = ?
    WHERE s.is_active = 1
    ORDER BY s.id
  `).all(date);

  res.json(seats);
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const seat = db.prepare(`
    SELECT s.*, z.name as zone_name, z.color as zone_color, wa.name as area_name
    FROM seats s
    LEFT JOIN zones z ON s.zone_id = z.id
    LEFT JOIN workstation_areas wa ON s.workstation_area_id = wa.id
    WHERE s.id = ?
  `).get(req.params.id);

  if (!seat) return res.status(404).json({ error: 'Seat not found' });
  res.json(seat);
});

export default router;
