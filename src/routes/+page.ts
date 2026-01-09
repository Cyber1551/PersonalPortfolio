import type { PageLoad } from './$types';
import { heroText, jobTitle, yearsOfExperience } from '$lib/data/about';

export const load: PageLoad = async () => {
	return {
		heroText,
		jobTitle,
		yearsOfExperience
	};
};