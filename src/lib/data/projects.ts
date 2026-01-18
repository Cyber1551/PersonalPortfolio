import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		title: 'Clarity',
		summary: 'A cross-platform desktop media organizer that deduplicates content via hashing and exposes a tag-based filesystem view using hardlinks.',
		slug: 'clarity',
		tech: [
			{ name: 'React', icon: 'logos:react' },
			{ name: 'Rust', icon: 'logos:rust' },
			{ name: 'Tauri', icon: 'logos:tauri' },
			{ name: 'Tailwind', icon: 'logos:tailwindcss-icon' }
		],
		tags: ['Desktop Apps', 'Systems Programming'],
		images: [
			{ path: '/images/projects/clarity/demo.mp4' },
			{ path: '/images/projects/clarity/grid.png' },
			{ path: '/images/projects/clarity/viewer.png' },
			{ path: '/images/projects/clarity/root_fs.png' },
			{ path: '/images/projects/clarity/sorted_fs.png' }
		],
		links: [
			{ type: 'github', url: 'https://github.com/Cyber1551/Clarity' },
			{ type: 'devlog', url: '/devlog?series=Clarity', label: 'DevLog' }
		]
	},
	{
		title: 'Routing Simulation',
		summary: 'Generates optimal routes for military convoys, prioritizing the structural health of bridges while minimizing the risk of ambushes.',
		slug: 'routing_simulation',
		tech: [
			{ name: 'React', icon: 'logos:react' },
			{ name: 'C#', icon: 'logos:c-sharp' },
			{ name: 'Python', icon: 'logos:python' },
			{ name: 'PostGIS', icon: 'logos:postgis' },
			{ name: 'Docker', icon: 'logos:docker-icon' }
		],
		tags: ['Web Development', 'Research & Algorithms', 'Simulation'],
		images: [{ path: '/images/projects/routing.png', offset: { y: 100 } }],
		links: [
			{ type: 'publication', url: '/publications/bridge_health' },
			{ type: 'github', url: 'https://github.com/ricksteam/DynamicSimulationConsole', label: 'API' },
			{ type: 'github', url: 'https://github.com/ricksteam/DynamicSimulationEngine', label: 'Routing Engine' }
		]
	},
	{
		title: 'The Necrotic Trials',
		summary: 'A tactical roguelite hobby game featuring necromancy, where players summon and strategize with undead teams to conquer a dungeon.',
		slug: 'the_necrotic_trials',
		tech: [
			{ name: 'Unity 3D', icon: 'logos:unity' },
			{ name: 'C#', icon: 'logos:c-sharp' }
		],
		tags: ['Game Development'],
		images: [
			{ path: '/images/projects/the_necrotic_trials/Corrupt.mp4' },
			{ path: '/images/projects/the_necrotic_trials/necrotictrials.png', offset: { y: 100 } },
			{ path: '/images/projects/the_necrotic_trials/ability.png' },
			{ path: '/images/projects/the_necrotic_trials/Attack1.mp4' },
			{ path: '/images/projects/the_necrotic_trials/Attack2.mp4' },
			{ path: '/images/projects/the_necrotic_trials/upgrade.png', offset: { zoom: 1.2, fit: 'contain' } },
			{ path: '/images/projects/the_necrotic_trials/Zoom.mp4' }
		],
		links: [
			{ type: 'youtube', url: 'https://youtube.com/playlist?list=PL_0Moy4B-vsVTob-tk3sldA20XA-vkl9m&si=Akn1op-MiVcgjwEq', label: 'DevLog Channel' }
		]
	},
	{
		title: 'Anvil Cell Workbench',
		summary: 'A AE2 Unoffical Extended Life addon for Minecraft 1.12.2 that introduces a new Anvil Cell Workbench block which combines the renaming functionality of the vanilla anvil and the AE2 Cell workbench',
		slug: 'anvil_cell_workbench',
		tech: [{ name: 'Java', icon: 'logos:java' }],
		tags: ['Modding', 'Game Development'],
		images: [
			{ path: '/images/projects/anvil_cell_workbench/anvil_cell_workbench1.png', offset: { y: 0 } },
			{ path: '/images/projects/anvil_cell_workbench/anvil_cell_workbench2.png' },
			{ path: '/images/projects/anvil_cell_workbench/anvil_cell_workbench3.png', offset: { y: 50, fit: 'contain' } }
		],
		links: [{ type: 'github', url: 'https://github.com/Cyber1551/Anvil-Cell-Workbench' }]
	},
	{
		title: 'Enhanced P2P',
		summary: 'Improved fork of Better P2P for Applied Energistics 2 for Minecraft 1.12.2 that introduces a search feature.',
		slug: 'enhanced_p2p',
		tech: [
			{ name: 'Kotlin', icon: 'logos:kotlin' },
			{ name: 'Java', icon: 'logos:java' }
		],
		tags: ['Modding', 'Game Development'],
		images: [
			{ path: '/images/projects/enhanced_p2p/enhanced_p2p1.png', offset: { y: 0 } },
			{ path: '/images/projects/enhanced_p2p/enhanced_p2p2.png', offset: { y: 0, fit: 'contain' } }
		],
		links: [{ type: 'github', url: 'https://github.com/Cyber1551/EnhancedP2P' }],
		forked: true
	},
	{
		title: 'Fluidic Arm',
		summary: 'A GregTech: Community Edition Unofficial addon for Minecraft 1.12.2 that introduces a new Fluidic Arm cover which combines the functionality of a Robotic Arm and a Fluid Regulator.',
		slug: 'fluidic_arm',
		tech: [{ name: 'Java', icon: 'logos:java' }],
		tags: ['Modding', 'Game Development'],
		images: [
			{ path: '/images/projects/fluidic_arm/fluidic_arm1.png', offset: { y: 50, fit: 'contain' } },
			{ path: '/images/projects/fluidic_arm/fluidic_arm2.png' },
			{ path: '/images/projects/fluidic_arm/fluidic_arm3.png', offset: { y: 50, fit: 'contain' } },
			{ path: '/images/projects/fluidic_arm/fluidic_arm4.png', offset: { y: 0 } }
		],
		links: [{ type: 'github', url: 'https://github.com/Cyber1551/Fluidic-Arm' }]
	},
];

export const projectLinksConfig = {
	github: {
		label: 'Code',
		icon: 'mage:github',
		baseClass: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500'
	},
	demo: {
		label: 'Demo',
		icon: 'mage:external-link',
		baseClass: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
	},
	youtube: {
		label: 'Video',
		icon: 'logos:youtube-icon',
		baseClass: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200'
	},
	devlog: {
		label: 'DevLog',
		icon: 'mage:hash',
		baseClass: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200'
	},
	publication: {
		label: 'Publication',
		icon: 'mage:clipboard-2',
		baseClass: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500'
	}
};

export const allTags: string[] = Array.from(new Set(projects.flatMap((p) => p.tags))).sort((a, b) =>
	a.localeCompare(b)
);

export const allTech: string[] = Array.from(
	new Set(projects.flatMap((p) => p.tech.map((t) => t.name)))
).sort((a, b) => a.localeCompare(b));

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
