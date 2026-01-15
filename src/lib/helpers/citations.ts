import type { Publication } from '$lib/types';

const parseAuthor = (author: string) => {
	const trimmed = author.trim();
	// Handles "Last, First" (e.g., "Kassa, Y.")
	if (trimmed.includes(', ')) {
		const [last, first] = trimmed.split(', ');
		return { last: last.trim(), first: first.trim() };
	}
	// Handles "First Last" (e.g., "Yohannes Kassa")
	const parts = trimmed.split(' ');
	if (parts.length > 1) {
		return {
			last: parts[parts.length - 1].trim(),
			first: parts.slice(0, -1).join(' ').trim()
		};
	}
	return { last: trimmed, first: '' };
};

const formatAuthors = (
	authors: string | string[],
	style: 'APA' | 'MLA' | 'Chicago' | 'IEEE' | 'BibTeX'
) => {
	const authorList = Array.isArray(authors) ? authors : [authors];
	if (authorList.length === 0) return 'Unknown Author';

	const parsed = authorList.map(parseAuthor);

	if (style === 'IEEE') {
		const formatted = parsed.map((a) => (a.first ? `${a.first} ${a.last}` : a.last));
		if (formatted.length === 1) return formatted[0];
		if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
		return `${formatted.slice(0, -1).join(', ')}, and ${formatted[formatted.length - 1]}`;
	}

	if (style === 'BibTeX') {
		return authorList.join(' and ');
	}

	if (style === 'APA') {
		const formatted = parsed.map((a) => (a.first ? `${a.last}, ${a.first}` : a.last));
		if (formatted.length === 1) return formatted[0];
		if (formatted.length === 2) return `${formatted[0]} & ${formatted[1]}`;
		return `${formatted.slice(0, -1).join(', ')}, & ${formatted[formatted.length - 1]}`;
	}

	if (style === 'MLA' || style === 'Chicago') {
		const formatted = parsed.map((a, i) => {
			if (i === 0) return a.first ? `${a.last}, ${a.first}` : a.last;
			return a.first ? `${a.first} ${a.last}` : a.last;
		});
		if (formatted.length === 1) return formatted[0];
		if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
		return `${formatted.slice(0, -1).join(', ')}, and ${formatted[formatted.length - 1]}`;
	}

	return authorList.join(', ');
};

const ensurePeriod = (text: string) => {
	const t = text.trim();
	if (!t) return '';
	if (t.endsWith('.') || t.endsWith('?') || t.endsWith('!')) return t;
	return t + '.';
};

export const formatDOI = (doi?: string) => {
	if (!doi) return '';
	if (doi.startsWith('http')) return doi;
	return `https://doi.org/${doi}`;
};

export const makeAPACitation = (pub?: Publication) => {
	if (!pub) return '';
	const authors = formatAuthors(pub.authors, 'APA');
	let citation = `${ensurePeriod(authors)} (${pub.year}). ${ensurePeriod(pub.title)} `;
	if (pub.venue) citation += `${ensurePeriod(pub.venue)} `;
	return citation + formatDOI(pub.links?.doi || pub.links?.url);
};

export const makeMLACitation = (pub?: Publication) => {
	if (!pub) return '';

	// MLA Format: Authors. "Title." Conference, Year. DOI/URL
	const authors = formatAuthors(pub.authors, 'MLA');
	let citation = `${authors}. "${pub.title}." `;

	if (pub.venue) {
		citation += `${pub.venue}, `;
	}

	citation += `${pub.year}.`;

	if (pub.links?.doi) {
		citation += ` https://doi.org/${pub.links.doi}`;
	} else if (pub.links?.url) {
		citation += ` ${pub.links.url}`;
	}

	return citation;
};

export const makeChicagoCitation = (pub?: Publication) => {
	if (!pub) return '';

	// Chicago Format: Authors. "Title." Conference (Year). DOI/URL
	const authors = formatAuthors(pub.authors, 'Chicago');
	let citation = `${authors}. "${pub.title}." `;

	if (pub.venue) {
		citation += `${pub.venue} `;
	}

	citation += `(${pub.year}).`;

	if (pub.links?.doi) {
		citation += ` https://doi.org/${pub.links.doi}.`;
	} else if (pub.links?.url) {
		citation += ` ${pub.links.url}.`;
	}

	return citation;
};

export const makeIEEECitation = (pub?: Publication) => {
	if (!pub) return '';
	const authors = formatAuthors(pub.authors, 'IEEE');
	let citation = `${authors}, "${pub.title}," `;
	if (pub.venue) citation += `in ${pub.venue}, `;
	citation += `${pub.year}.`;
	const doi = formatDOI(pub.links?.doi || pub.links?.url);
	if (doi) citation += ` [Online]. Available: ${doi}`;
	return citation;
};

export const makeBibTeXCitation = (pub?: Publication) => {
	if (!pub) return '';

	// BibTeX Format
	const slug = pub.slug || 'unknown';
	const authors = formatAuthors(pub.authors, 'BibTeX');

	let bibtex = `@inproceedings{${slug}${pub.year},\n`;
	bibtex += `  author = {${authors}},\n`;
	bibtex += `  title = {${pub.title}},\n`;

	if (pub.venue) {
		bibtex += `  booktitle = {${pub.venue}},\n`;
	}

	bibtex += `  year = {${pub.year}}`;

	if (pub.links?.doi) {
		bibtex += `,\n  doi = {${pub.links.doi}}`;
	}

	if (pub.links?.url) {
		bibtex += `,\n  url = {${pub.links.url}}`;
	}

	bibtex += `\n}`;

	return bibtex;
};
