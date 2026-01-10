import type { SkillCategory } from '$lib/types';

export const skillCategories: SkillCategory[] = [
	{
		name: 'Tools & Technologies',
		sort_order: 0,
		skills: [
			{ name: 'React', icon: 'devicon:react', sort_order: 0 },
			{ name: 'C#', icon: 'devicon:csharp', sort_order: 1 },
			{ name: 'Python', icon: 'devicon:python', sort_order: 2 },
			{ name: 'Git', icon: 'devicon:git', sort_order: 3 },
			{ name: 'Azure', icon: 'devicon:azure', sort_order: 4 },
			{ name: 'Microsoft SQL', icon: 'ph:file-sql', sort_order: 5 },
			{ name: 'TypeScript', icon: 'devicon:typescript', sort_order: 6 },
			{ name: 'Java', icon: 'devicon:java', sort_order: 7 },
			{ name: 'C++', icon: 'devicon:cplusplus', sort_order: 8 },
			{ name: 'Rust', icon: 'devicon:rust', sort_order: 9 },
			{ name: 'PostgreSQL', icon: 'devicon:postgresql', sort_order: 10 },
			{ name: 'Redux', icon: 'devicon:redux', sort_order: 11 },
			{ name: 'Docker', icon: 'devicon:docker', sort_order: 12 },
			{ name: 'Angular', icon: 'devicon:angular', sort_order: 13 },
			{ name: 'TailwindCSS', icon: 'devicon:tailwindcss', sort_order: 14 },
			{ name: 'Svelte', icon: 'devicon:svelte', sort_order: 15 },
			{ name: 'Vue', icon: 'devicon:vuejs', sort_order: 16 },
			{ name: 'Unity', icon: 'devicon:unity', sort_order: 17 }
		]
	}
	// {
	// 	name: 'Currently Learning',
	// 	sort_order: 1,
	// 	skills: [
	// 		{ name: 'Computer Architecture', icon: 'icon-park-outline:chip', sort_order: 0 },
	// 		{ name: 'SystemVerilog', icon: 'vscode-icons:file-type-systemverilog', sort_order: 1 },
	// 		{ name: 'RISC-V Assembly', icon: 'file-icons:assembly-riscv', sort_order: 2 },
	// 		{ name: 'QEMU', icon: 'simple-icons:qemu', sort_order: 3 },
	// 		{ name: 'VHDL', icon: 'file-icons:vhdl', sort_order: 4 }
	// 	]
	// }
];
