// TODO: fix some formatting issues with the citation code. Specifically, authors in IEEE formats are not formatted correctly. Additionally, some punctuation is incorrect in MLA and Chicago formats.

import type { Publication } from '$lib/types';

export const makeAPACitation = (pub?: Publication) => {
	if (!pub) return '';

	// APA Format: Authors (Year). Title. Conference. DOI/URL
	const authors = pub.authors || 'Unknown Author';
	let citation = `${authors} (${pub.year}). ${pub.title}. `;

	if (pub.conference) {
		citation += `${pub.conference}. `;
	}

	if (pub.links?.doi) {
		citation += `https://doi.org/${pub.links.doi}`;
	} else if (pub.links?.url) {
		citation += pub.links.url;
	}

	return citation;
}

export const makeMLACitation = (pub?: Publication) => {
	if (!pub) return '';

	// MLA Format: Authors. "Title." Conference, Year. DOI/URL
	const authors = pub.authors || 'Unknown Author';
	let citation = `${authors} "${pub.title}." `;

	if (pub.conference) {
		citation += `${pub.conference}, `;
	}

	citation += `${pub.year}.`;

	if (pub.links?.doi) {
		citation += ` https://doi.org/${pub.links.doi}`;
	} else if (pub.links?.url) {
		citation += ` ${pub.links.url}`;
	}

	return citation;
}

export const makeChicagoCitation = (pub?: Publication) => {
	if (!pub) return '';

	// Chicago Format: Authors. "Title." Conference (Year). DOI/URL
	const authors = pub.authors || 'Unknown Author';
	let citation = `${authors} "${pub.title}." `;

	if (pub.conference) {
		citation += `${pub.conference} `;
	}

	citation += `(${pub.year}).`;

	if (pub.links?.doi) {
		citation += ` https://doi.org/${pub.links.doi}.`;
	} else if (pub.links?.url) {
		citation += ` ${pub.links.url}.`;
	}

	return citation;
}

export const makeIEEECitation= (pub?: Publication) => {
	if (!pub) return '';

	// IEEE Format: [1] Authors, "Title," Conference, Year. [Online]. Available: DOI/URL
	const authors = pub.authors || 'Unknown Author';
	let citation = `${authors}, "${pub.title}," `;

	if (pub.conference) {
		citation += `${pub.conference}, `;
	}

	citation += `${pub.year}.`;

	if (pub.links?.doi) {
		citation += ` [Online]. Available: https://doi.org/${pub.links.doi}`;
	} else if (pub.links?.url) {
		citation += ` [Online]. Available: ${pub.links.url}`;
	}

	return citation;
}

export const makeBibTeXCitation = (pub?: Publication) => {
	if (!pub) return '';

	// BibTeX Format
	const slug = pub.slug || 'unknown';
	const authors = pub.authors || 'Unknown Author';

	let bibtex = `@inproceedings{${slug}${pub.year},\n`;
	bibtex += `  author = {${authors}},\n`;
	bibtex += `  title = {${pub.title}},\n`;

	if (pub.conference) {
		bibtex += `  booktitle = {${pub.conference}},\n`;
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
}