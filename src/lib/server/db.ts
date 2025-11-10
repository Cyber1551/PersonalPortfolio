// Server-only SQLite helper using better-sqlite3
// - Provides a singleton connection that survives HMR in dev
// - Initializes a minimal schema for projects, publications, dev posts, and skills

import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_PATH = path.join(__dirname, 'database', 'content.db');

function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

declare global {
  // eslint-disable-next-line no-var
  var __db__: Database.Database | undefined;
}

let db: Database.Database;

export function getDb() {
  if (!db) {
    if (!globalThis.__db__) {
      ensureDirExists(DEFAULT_PATH);
      const instance = new Database(DEFAULT_PATH);
      instance.pragma('journal_mode = WAL');
      instance.pragma('foreign_keys = ON');
      globalThis.__db__ = instance;
      initSchema(instance);
    }
    db = globalThis.__db__!;
  }
  return db;
}

export function initSchema(d: Database.Database = getDb()) {
  const sql = `
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      year INTEGER,
			tags TEXT,
      image TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS publications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      conference TEXT NOT NULL,
      year INTEGER NOT NULL,
			authors TEXT NOT NULL,
			pdf TEXT,
			url TEXT,
			doi TEXT,
      abstract TEXT,
			sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills_category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skill (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL REFERENCES skills_category(id) ON DELETE CASCADE,
      name TEXT NOT NULL UNIQUE,
      icon TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );
  `;
  d.exec(sql);
}

export type Sqlite = ReturnType<typeof getDb>;
