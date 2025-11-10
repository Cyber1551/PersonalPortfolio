import type { PageServerLoad } from './$types';
import { getPublicationBySlug, getPublications } from '$lib/server/repos/publications';

export const load: PageServerLoad = async ({ params }) => {
	const publication = getPublicationBySlug(params.slug);
	return {
		publication
	};
};