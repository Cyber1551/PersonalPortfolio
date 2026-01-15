import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDevlogPostBySlug } from '$lib/loaders/devlog';

export const load: PageLoad = async ({ params }) => {
	const data = await getDevlogPostBySlug(params.slug);

	if (!data) {
		error(404, {
			message: `DevLog Post "${params.slug}" not found`
		});
	}

	return data;
};
