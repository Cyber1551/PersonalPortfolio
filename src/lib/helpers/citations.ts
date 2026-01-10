import type { Publication } from '$lib/types';

const formatAuthors = (
	authors: string | string[],
	style: 'APA' | 'MLA' | 'Chicago' | 'IEEE' | 'BibTeX'
) => {
	const authorList = Array.isArray(authors) ? authors : [authors];
	if (authorList.length === 0) return 'Unknown Author';

	if (style === 'IEEE') {
		const formatted = authorList.map((author) => {
			const parts = author.trim().split(' ');
			if (parts.length > 1) {
				const firstInitial = parts[0][0];
				const lastName = parts[parts.length - 1];
				return `${firstInitial}. ${lastName}`;
			}
			return author;
		});

		if (formatted.length === 1) return formatted[0];
		if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
		return `${formatted.slice(0, -1).join(', ')}, and ${formatted[formatted.length - 1]}`;
	}

	if (style === 'BibTeX') {
		return authorList.join(' and ');
	}

	if (authorList.length === 1) return authorList[0];
	if (authorList.length === 2) return `${authorList[0]} and ${authorList[1]}`;
	return `${authorList.slice(0, -1).join(', ')}, and ${authorList[authorList.length - 1]}`;
};

export const makeAPACitation = (pub?: Publication) => {
	if (!pub) return '';

	// APA Format: Authors (Year). Title. Conference. DOI/URL
	const authors = formatAuthors(pub.authors, 'APA');
	let citation = `${authors} (${pub.year}). ${pub.title}. `;

	if (pub.venue) {
		citation += `${pub.venue}. `;
	}

	if (pub.links?.doi) {
		citation += `https://doi.org/${pub.links.doi}`;
	} else if (pub.links?.url) {
		citation += pub.links.url;
	}

	return citation;
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

	// IEEE Format: Authors, "Title," Conference, Year. [Online]. Available: DOI/URL
	const authors = formatAuthors(pub.authors, 'IEEE');
	let citation = `${authors}, "${pub.title}," `;

	if (pub.venue) {
		citation += `${pub.venue}, `;
	}

	citation += `${pub.year}.`;

	if (pub.links?.doi) {
		citation += ` [Online]. Available: https://doi.org/${pub.links.doi}`;
	} else if (pub.links?.url) {
		citation += ` [Online]. Available: ${pub.links.url}`;
	}

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
