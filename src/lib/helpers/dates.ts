export const formatDate = (iso: string) => {
	try {
		const date = new Date(iso);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			timeZone: 'UTC'
		}).format(date);
	} catch {
		return iso;
	}
};
