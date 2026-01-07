import type { PageLoad } from './$types';
import { publications } from '$lib/data/publications';

export const load: PageLoad = async () => {
	return {
		publications
	};
};
