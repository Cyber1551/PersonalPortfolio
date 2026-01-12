import type { PageLoad } from './$types';
import { getPublicationBySlug } from '$lib/data/publications';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const publication = getPublicationBySlug(params.slug);
	if (!publication) {
		error(404, {
			message: `Publication "${params.slug}" not found`
		});
	}
	return {
		publication
	};
};
