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
	conference: string;
	year: number;
	authors: string;
	links: {
		pdf?: string;
		url?: string;
		doi?: string;
	};
	abstract?: string;
	sort_order: number;
};

export type Project = {
	title: string;
	slug: string;
	summary: string;
	year?: number;
	tech: string[];
	tags: string[];
	links?: string[];
	image?: string;
	featured?: boolean;
};

export type DevlogPost = {
	title: string;
	slug: string;
	date: string;
	summary: string;
	tags: string[];
	content?: string[];
};