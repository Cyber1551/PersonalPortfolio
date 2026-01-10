import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		title: 'Clarity',
		summary: 'A cross-platform desktop media organizer that deduplicates content via hashing and exposes a tag-based filesystem view using hardlinks.',
		slug: 'clarity',
		tech: [
			{ name: 'Svelte', icon: 'logos:svelte-icon' },
			{ name: 'Rust', icon: 'logos:rust' },
			{ name: 'Tauri', icon: 'logos:tauri' },
			{ name: 'Tailwind', icon: 'logos:tailwindcss-icon' }
		],
		tags: ['Desktop Apps', 'Systems Programming'],
		images: [
			{ path: '/images/projects/clarity.png' },
			{ path: '/images/projects/fantasia.png' },
			{ path: '/images/projects/zenith.png' }
		],
		links: {
			github: 'https://github.com/Cyber1551/Clarity',
			demo: 'https://clarity.app',
			devlog: '/devlog/clarity-arch',
			youtube: 'https://youtube.com/watch?v=123'
		},
		overview: 'A cross-platform desktop media organizer that deduplicates'
	},
	{
		title: 'Routing Simulation',
		summary: 'Generates optimal routes for military convoys, prioritizing the structural health of bridges while minimizing the risk of ambushes.',
		slug: 'routing-simulation',
		tech: [
			{ name: 'React', icon: 'logos:react' },
			{ name: 'C#', icon: 'logos:c-sharp' },
			{ name: 'Python', icon: 'logos:python' },
			{ name: 'PostGIS', icon: 'logos:postgis' },
			{ name: 'Docker', icon: 'logos:docker-icon' }
		],
		tags: ['Web Development', 'Research & Algorithms', 'Simulation'],
		images: [{ path: '/images/projects/routing.png', offset: { y: 100 } }],
		links: {
			github: 'https://github.com/Cyber1551/Routing'
		},
		overview: ''
	},
	{
		title: 'Zenith',
		summary: 'A WIP note taking app designed to help myself create technical notes for learning new topics. Served as my foray into learning Svelte.',
		slug: 'zenith',
		tech: [
			{ name: 'Svelte', icon: 'logos:svelte-icon' },
			{ name: 'Rust', icon: 'logos:rust' },
			{ name: 'Tauri', icon: 'logos:tauri' },
			{ name: 'Tailwind', icon: 'logos:tailwindcss-icon' }
		],
		tags: ['Desktop Apps'],
		images: [{ path: '/images/projects/zenith.png', offset: { y: 0 } }],
		links: {
			devlog: '/devlog/zenith-start'
		},
		overview: ''
	},
	{
		title: 'The Necrotic Trials',
		summary: 'A tactical roguelite hobby game featuring necromancy, where players summon and strategize with undead teams to conquer a dungeon.',
		slug: 'the-necrotic-trials',
		tech: [
			{ name: 'Unity 3D', icon: 'logos:unity' },
			{ name: 'C#', icon: 'logos:c-sharp' }
		],
		tags: ['Game Development'],
		images: [{ path: '/images/projects/necrotictrials.png', offset: { y: 100 } }],
		links: {
			youtube: 'https://youtube.com/playlist?list=PL_0Moy4B-vsVTob-tk3sldA20XA-vkl9m&si=Akn1op-MiVcgjwEq'
		},
		overview: ''
	}
];

export const allTags: string[] = Array.from(new Set(projects.flatMap((p) => p.tags))).sort((a, b) =>
	a.localeCompare(b)
);

export const allTech: string[] = Array.from(
	new Set(projects.flatMap((p) => p.tech.map((t) => t.name)))
).sort((a, b) => a.localeCompare(b));

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
