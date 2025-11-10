import type { PageServerLoad } from './$types';
import { getSkillCategories } from '$lib/server/repos/skills';

export const load: PageServerLoad = async () => {
	const categories = getSkillCategories();
	return {
		categories
	};
};