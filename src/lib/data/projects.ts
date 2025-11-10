import type { Project } from '$lib/types';

export const projects: Project[] = [];

export const allTags: string[] = Array.from(
	new Set(projects.flatMap((p) => p.tags))
).sort((a, b) => a.localeCompare(b));

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
