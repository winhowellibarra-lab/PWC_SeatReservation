import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initializeDatabase, getDb } from './db/database.js';
import bookingsRouter from './routes/bookings.js';
import seatsRouter from './routes/seats.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

initializeDatabase();

app.use('/api/seats', seatsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/admin', adminRouter);

app.get('/api/zones', (req, res) => {
  res.json(getDb().prepare('SELECT * FROM zones ORDER BY name').all());
});

app.get('/api/rooms', (req, res) => {
  res.json(getDb().prepare('SELECT * FROM rooms ORDER BY name').all());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
