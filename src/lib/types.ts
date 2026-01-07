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
	offset?: { x?: number; y?: number };
};

export type Project = {
	title: string;
	slug: string;
	summary: string;
	year?: number;
	tech: { name: string; icon: string }[];
	tags: string[];
	links: {
		demo?: string;
		github?: string;
		youtube?: string;
		devlog?: string;
	};
	images: ProjectImage[];
	featured?: boolean;
	overview: string;
};

export type DevlogPost = {
	title: string;
	slug: string;
	date: string;
	summary: string;
	tags: string[];
	content?: string[];
};

export type Experience = {
	company: string;
	role: string;
	location: string;
	start: string;
	end: string;
	description: string;
	tech?: string[];
	projects?: { name: string; slug: string }[];
	publications?: { name: string; slug: string }[];
};

export type Education = {
	school: string;
	degree: string;
	location: string;
	start: string;
	end: string;
	description?: string;
};