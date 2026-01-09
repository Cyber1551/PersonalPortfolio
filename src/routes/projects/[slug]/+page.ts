import type { PageLoad } from './$types';
import { getProjectBySlug } from '$lib/data/projects';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		error(404, {
			message: `Project "${params.slug}" not found`
		});
	}

	return {
		project
	};
};
