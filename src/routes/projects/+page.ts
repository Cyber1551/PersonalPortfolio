import type { PageLoad } from './$types';
import { projects, allTags, allTech } from '$lib/data/projects';

export const load: PageLoad = async () => {
	return {
		projects,
		allTags,
		allTech
	};
};