export async function getProjectContentBySlug(slug: string) {
	const posts = import.meta.glob('/src/content/projects/*.md', { eager: true });
	const match = posts[`/src/content/projects/${slug}.md`] as any;

	return match?.default || null;
}
