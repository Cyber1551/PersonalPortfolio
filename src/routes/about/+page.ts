import type { PageLoad } from './$types';
import { aboutParagraphs } from '$lib/data/about';
import { skillCategories } from '$lib/data/skills';

export const load: PageLoad = async () => {
	return {
		aboutParagraphs,
		skillCategories
	};
};
