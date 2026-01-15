import type { PageLoad } from './$types';
import { heroText, jobTitle, yearsOfExperience } from '$lib/data/about';
import { resumeLink } from '$lib/data/links';

export const load: PageLoad = async () => {
	return {
		heroText,
		jobTitle,
		yearsOfExperience,
		resumeLink
	};
};
