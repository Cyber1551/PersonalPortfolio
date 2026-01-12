import type { PageLoad } from './$types';
import { getPostBySlug } from '$lib/data/devlog';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const post = getPostBySlug(params.slug);
	if (!post) {
		error(404, {
			message: `DevLog Post "${params.slug}" not found`
		});
	}

	return {
		post
	};
};
