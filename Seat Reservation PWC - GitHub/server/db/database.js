import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { seedAll } from './seed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

export function getDb() {
  if (!db) {
    db = new Database(join(__dirname, 'seats.db'));
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

export function initializeDatabase() {
  const database = getDb();
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  database.exec(schema);

  const count = database.prepare('SELECT COUNT(*) as count FROM zones').get();
  if (count.count === 0) {
    console.log('Database is empty, running seed...');
    seedAll(database);
    console.log('Seed complete.');
  }
}
