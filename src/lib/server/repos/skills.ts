import { getDb } from '../db';
import type { SkillCategory } from '$lib/types';

export function getSkillCategories(): SkillCategory[] {
  const db = getDb();
  const categories = db
    .prepare('SELECT id, name, sort_order FROM skills_category ORDER BY sort_order, name')
    .all() as { id: number; name: string; sort_order: number }[];

  if (categories.length === 0) return [];

  const ids = categories.map((c) => c.id);
  const placeholders = ids.map(() => '?').join(',');
  const skills = db
    .prepare(
      `SELECT category_id, name, icon, sort_order
       FROM skill
       WHERE category_id IN (${placeholders})
       ORDER BY sort_order, name`
		).all(...ids) as { category_id: number; name: string; icon: string; sort_order: number }[];

  const byCatId = new Map<number, SkillCategory>(
    categories.map((c) => [c.id, { name: c.name, sort_order: c.sort_order, skills: [] }])
  );

  for (const s of skills) {
    const cat = byCatId.get(s.category_id);
    if (cat) cat.skills.push({ name: s.name, icon: s.icon, sort_order: s.sort_order });
  }

  return [...byCatId.values()];
}