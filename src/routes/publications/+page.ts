import type { PageLoad } from './$types';
import { publications, allTags } from '$lib/data/publications';

export const load: PageLoad = async () => {
	return {
		publications,
		allTags
	};
};
