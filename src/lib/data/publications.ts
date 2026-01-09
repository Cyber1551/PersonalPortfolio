import type { Publication } from '$lib/types';

export const publications: Publication[] = [
	{
		slug: 'bridge-health',
		title: 'Bridge Health-Informed Route Planning: Challenges and Promises',
		venue: 'International Conference on Transportation and Development',
		year: 2024,
		authors: ['Kassa, Y.', 'Heller, W.', 'Lacy, B.', 'Ricks, B.', 'Gandhi, R.'],
		links: {
			pdf: 'pdfs/publications/Bridge Health-Informed Route Planning Challenges and Promises.pdf',
			doi: 'https://doi.org/10.1061/9780784485514.010'
		},
		abstract: 'Ensuring bridge safety is crucial for transportation in many countries, including the US. In fact, the ASCE gave an overall cumulative grade of C− for US infrastructure, in large part due to deteriorating bridges. Unsafe bridges within transportation routes pose significant challenges to stakeholders including traffic safety concerns, environmental hazards, and economic implications. The collapse of Minneapolis I-35W bridge highlights these issues. Our research encourages stakeholders to make informed decisions by taking into account bridge risk factors and the sensitivity of transported materials (e.g., hazardous materials, heavy equipment). This approach enables strategies like load balancing, rerouting enforcement, and prioritizing maintenance tasks to be applied effectively. We generated a bridge-health enriched geographic information system (GIS) dataset that integrates bridge information from the National Bridge Inventory (NBI) with GIS data from OpenStreetMap. We analyzed example origin-destination (O-D) pairs in Nebraska to demonstrate how different routes in Nebraska exhibit, besides differences in travel distance, varying statistics on bridge health scores. We also introduce a simulation platform for route planning and visualization currently in active development. We finally discuss the challenges we faced and opportunities ahead in combining these distinct datasets for sustainable route planning and infrastructure maintenance.',
		tags: ['Research', 'Algorithms', 'Simulation', 'GIS'],
		sort_order: 0
	},
	{
		slug: 'vr-hand-dexerity',
		title: 'Use of Virtual Reality for Assessing Gross Hand Dexterity in Young Healthy Individuals',
		venue: 'Summer Biomechanics, Bioengineering, and Biotransport Conference (SB³C). Vail, Colorado.',
		year: 2020,
		authors: ['Parker, S.', 'Leutzinger, T.', 'Lacy, B.', 'Ricks, B.', 'Zuniga, J.', 'Knarr, B.'],
		links: {
			pdf: 'pdfs/publications/Use of Virtual Reality for Assessing Gross Hand Dexterity in Young Healthy Individuals.pdf',
			url: 'https://www.researchgate.net/publication/352741111_Use_of_Virtual_Reality_for_Assessing_Gross_Hand_Dexterity_in_Young_Healthy_Individuals_Extended_Abstract'
		},
		abstract: 'Functional tasks can be used to monitor motor progress in rehabilitation. One such task is the Box and Block Test (BBT), which evaluates gross hand dexterity. However, traditional BBT requires specialized equipment and physical presence in a clinic. Virtual Reality (VR) offers a portable and potentially more accessible alternative. This study aimed to develop a VR-based BBT and evaluate its concurrent validity with the traditional BBT in young healthy individuals.',
		tags: ['Research', 'Virtual Reality', 'Biomechanics', 'Rehabilitation'],
		sort_order: 1
	}
];

export const allTags: string[] = Array.from(
	new Set(publications.flatMap((p) => p.tags ?? []))
).sort((a, b) => a.localeCompare(b));

export function getPublicationBySlug(slug: string): Publication | undefined {
	return publications.find((p) => p.slug === slug);
}
