import type { PageLoad } from './$types';
import { getProjectBySlug, projectLinksConfig } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export const load: PageLoad = async ({ params, fetch }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		error(404, {
			message: `Project "${params.slug}" not found`
		});
	}

	let overviewHtml = '';
	try {
		const response = await fetch(`/markdown/projects/${params.slug}.md`);
		if (response.ok) {
			const markdown = await response.text();
			overviewHtml = await marked.parse(markdown);
		}
	} catch (e) {
		console.error(`Failed to load overview for ${params.slug}:`, e);
	}

	return {
		project,
		overviewHtml,
		projectLinksConfig
	};
};
