import type { PageLoad } from './$types';
import { getProjectBySlug, projectLinksConfig } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import { getProjectContentBySlug } from '$lib/loaders/projects';

export const load: PageLoad = async ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		error(404, {
			message: `Project "${params.slug}" not found`
		});
	}

	const content = await getProjectContentBySlug(params.slug);

	return {
		project,
		content,
		projectLinksConfig
	};
};
