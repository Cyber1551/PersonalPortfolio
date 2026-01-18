import type { PageLoad } from './$types';
import { getAllDevlogPosts, getSeriesData, getAllSeriesMetadata } from '$lib/loaders/devlog';

export const load: PageLoad = async () => {
	const devPosts = await getAllDevlogPosts();
	const metadata = await getAllSeriesMetadata();
	const series = getSeriesData(devPosts, metadata);

	const allTags = Array.from(new Set(devPosts.flatMap((p) => p.tags))).sort((a, b) =>
		a.localeCompare(b)
	);

	return {
		devPosts,
		series,
		allTags
	};
};
