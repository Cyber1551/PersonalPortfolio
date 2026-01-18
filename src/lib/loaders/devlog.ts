import type { DevlogPost } from '$lib/types';

export interface SeriesData {
	name: string;
	summary: string;
	posts: DevlogPost[];
	lastUpdated: string;
}

export interface SeriesMetadata {
	series: string;
	summary: string;
}

export async function getAllDevlogPosts(): Promise<DevlogPost[]> {
	const paths = import.meta.glob('/src/content/devlog/**/*.md', { eager: true });
	const devPosts: DevlogPost[] = [];

	for (const path in paths) {
		if (path.endsWith('metadata.md')) continue;

		const file = paths[path] as any;
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<DevlogPost, 'slug'>;
			if (metadata.hide === true) continue;

			devPosts.push({
				...metadata,
				slug
			});
		}
	}

	return devPosts.sort((a, b) => {
		const dateCompare = b.date.localeCompare(a.date);
		if (dateCompare !== 0) return dateCompare;
		return (b.part ?? 0) - (a.part ?? 0);
	});
}

export async function getAllSeriesMetadata(): Promise<SeriesMetadata[]> {
	const paths = import.meta.glob('/src/content/devlog/**/metadata.md', { eager: true });
	const metadata: SeriesMetadata[] = [];

	for (const path in paths) {
		const file = paths[path] as any;
		if (file && typeof file === 'object' && 'metadata' in file) {
			metadata.push(file.metadata as SeriesMetadata);
		}
	}

	return metadata;
}

export function getSeriesData(
	devPosts: DevlogPost[],
	allMetadata: SeriesMetadata[] = []
): SeriesData[] {
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
			const metadata = allMetadata.find((m) => m.series === name);
			return {
				name,
				summary: metadata?.summary || `A series of posts about ${name}.`,
				posts: sortedPosts,
				lastUpdated: sortedPosts[sortedPosts.length - 1].date
			};
		})
		.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
}

export async function getDevlogPostBySlug(slug: string) {
	const posts = import.meta.glob('/src/content/devlog/**/*.md', { eager: true });
	let match: any = null;

	for (const path in posts) {
		if (path.endsWith(`/${slug}.md`) && !path.endsWith('metadata.md')) {
			match = posts[path];
			break;
		}
	}

	if (!match) return null;

	const post: DevlogPost = {
		...match.metadata,
		slug
	};

	if (post.hide === true) return null;

	let seriesNav = null;
	let seriesPosts: DevlogPost[] = [];
	
	if (post.series) {
		seriesPosts = Object.entries(posts)
			.filter(([path]) => !path.endsWith('metadata.md'))
			.map(([path, file]: [string, any]) => ({
				...file.metadata,
				slug: path.split('/').at(-1)?.replace('.md', '')
			}))
			.filter((p) => p.series === post.series && p.hide !== true)
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
