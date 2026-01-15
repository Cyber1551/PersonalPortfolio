import type { DevlogPost } from '$lib/types';
import { projects } from '$lib/data/projects';

export interface SeriesData {
	name: string;
	summary: string;
	posts: DevlogPost[];
	lastUpdated: string;
}

export async function getAllDevlogPosts(): Promise<DevlogPost[]> {
	const paths = import.meta.glob('/src/content/devlog/*.md', { eager: true });
	const devPosts: DevlogPost[] = [];

	for (const path in paths) {
		const file = paths[path] as any;
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<DevlogPost, 'slug'>;
			devPosts.push({
				...metadata,
				slug
			});
		}
	}

	return devPosts;
}

export function getSeriesData(devPosts: DevlogPost[]): SeriesData[] {
	const seriesMap = new Map<string, DevlogPost[]>();
	devPosts.forEach((post) => {
		if (post.series) {
			const posts = seriesMap.get(post.series) || [];
			posts.push(post);
			seriesMap.set(post.series, posts);
		}
	});

	return Array.from(seriesMap.entries())
		.map(([name, posts]) => {
			const sortedPosts = [...posts].sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
			const project = projects.find((p) => p.title === name);
			return {
				name,
				summary: project?.summary || `A series of posts about ${name}.`,
				posts: sortedPosts,
				lastUpdated: sortedPosts[sortedPosts.length - 1].date
			};
		})
		.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
}

export async function getDevlogPostBySlug(slug: string) {
	const posts = import.meta.glob('/src/content/devlog/*.md', { eager: true });
	const match = posts[`/src/content/devlog/${slug}.md`] as any;

	if (!match) return null;

	const post: DevlogPost = {
		...match.metadata,
		slug
	};

	let seriesNav = null;
	let seriesPosts: DevlogPost[] = [];
	
	if (post.series) {
		seriesPosts = Object.entries(posts)
			.map(([path, file]: [string, any]) => ({
				...file.metadata,
				slug: path.split('/').at(-1)?.replace('.md', '')
			}))
			.filter((p) => p.series === post.series)
			.sort((a, b) => (a.part ?? 0) - (b.part ?? 0));

		const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug);
		seriesNav = {
			prev: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
			next: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
			total: seriesPosts.length,
			current: currentIndex + 1
		};
	}

	return {
		post,
		content: match.default,
		seriesNav,
		seriesPosts
	};
}
