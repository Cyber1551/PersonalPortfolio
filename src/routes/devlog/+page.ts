import type { PageLoad } from './$types';
import { devPosts } from '$lib/data/devlog';

export const load: PageLoad = async () => {
	return {
		devPosts
	};
};
