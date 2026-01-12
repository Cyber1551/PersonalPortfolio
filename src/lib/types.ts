export type SkillItem = {
	name: string;
	icon: string;
	sort_order?: number;
};

export type SkillCategory = {
	name: string;
	sort_order: number;
	skills: SkillItem[];
};

export type Publication = {
	title: string;
	slug: string;
	venue: string;
	year: number;
	authors: string[];
	links: {
		pdf?: string;
		url?: string;
		doi?: string;
		arxiv?: string;
		code?: string;
	};
	abstract?: string;
	tags?: string[];
	sort_order: number;
};

export type ProjectImage = {
	path: string;
	offset?: { x?: number; y?: number; zoom?: number; fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' };
};

export type ProjectLink = {
	type: 'github' | 'demo' | 'youtube' | 'devlog' | 'publication';
	label?: string;
	url: string;
};

export type Project = {
	title: string;
	slug: string;
	summary: string;
	year?: number;
	tech: { name: string; icon: string }[];
	tags: string[];
	links: ProjectLink[];
	images: ProjectImage[];
	featured?: boolean;
	forked?: boolean;
};

export type DevlogPost = {
	title: string;
	slug: string;
	date: string;
	summary: string;
	tags: string[];
	content?: string[];
};
