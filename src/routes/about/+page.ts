import type { PageLoad } from './$types';
import { skillCategories } from '$lib/data/skills';

export const load: PageLoad = async () => {
	return {
		categories: skillCategories
	};
};
