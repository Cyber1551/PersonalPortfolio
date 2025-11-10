import { getDb } from '../db';
import type { Publication } from '$lib/types';

function rowToPublication(row: any): Publication {
  return {
    title: row.title,
    slug: row.slug,
    conference: row.conference,
    year: row.year,
		authors: row.authors,
    links: {
			pdf: row.pdf,
			url: row.url,
			doi: row.doi
		},
    abstract: row.abstract,
		sort_order: row.sort_order,
  };
}

export function getPublications(): Publication[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM publications ORDER BY sort_order').all();
  return rows.map(rowToPublication);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  const db = getDb();
  const row = db.prepare('SELECT * FROM publications WHERE slug = ?').get(slug);
  if (!row) return undefined;
  return rowToPublication(row);
}
