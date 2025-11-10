import { getDb } from '../db';
import type { Project } from '$lib/types';

function rowToProject(row: any): Project {
  return {
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    year: row.year ?? undefined,
    image: row.image ?? undefined,
    featured: !!row.featured,
    tech: [],
    tags: []
  };
}

export function getProjects(): Project[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM projects ORDER BY sort_order').all();
  return rows.map(rowToProject);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const db = getDb();
  const row = db.prepare('SELECT * FROM projects WHERE slug = ?').get(slug);
  if (!row) return undefined;
  return rowToProject(row);
}

export function getAllProjectTags(): string[] {
	const db = getDb();
	const rows = db.prepare('SELECT tags FROM projects WHERE tags IS NOT NULL').all();

	// Flatten and get unique tags
	const allTags = rows
		.flatMap((r: any) => (r.tags as string).split(','))
		.map(tag => tag.trim())
		.filter(Boolean); // Remove empty strings

	// Get unique and sort
	return [...new Set(allTags)].sort((a, b) =>
		a.localeCompare(b, undefined, { sensitivity: 'base' })
	);
}