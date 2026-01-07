import type { PageLoad } from './$types';
import { getPublicationBySlug } from '$lib/data/publications';

export const load: PageLoad = async ({ params }) => {
	const publication = getPublicationBySlug(params.slug);
	return {
		publication
	};
};
