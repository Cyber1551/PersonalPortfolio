import type { PageLoad } from './$types';
import { getAllDevlogPosts, getSeriesData } from '$lib/loaders/devlog';

export const load: PageLoad = async () => {
	const devPosts = await getAllDevlogPosts();
	const series = getSeriesData(devPosts);

	const allTags = Array.from(new Set(devPosts.flatMap((p) => p.tags))).sort((a, b) =>
		a.localeCompare(b)
	);

	return {
		devPosts,
		series,
		allTags
	};
};
