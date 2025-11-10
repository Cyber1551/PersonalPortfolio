import type { PageServerLoad } from './$types';
import { getPublications } from '$lib/server/repos/publications';

export const load: PageServerLoad = async () => {
	const publications = getPublications();
	return {
		publications
	};
};