import type { PageLoad } from './$types';
import { contactEmail, githubLink, linkedinLink } from '$lib/data/links';

export const load: PageLoad = async () => {
	return {
		contactEmail,
		githubLink,
		linkedinLink
	};
};
