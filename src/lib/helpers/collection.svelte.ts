import { SvelteSet } from 'svelte/reactivity';

type FilterFn<T> = (item: T, selected: SvelteSet<string>) => boolean;

export function createCollectionManager<T>(
	items: T[],
	options: {
		searchFn: (item: T) => string;
		filterFns: Record<string, FilterFn<T>>;
		pageSize?: number;
	}
) {
	let search = $state('');
	let visible = $state(options.pageSize ?? 6);

	// Create reactive sets for each filter category
	const filters = Object.keys(options.filterFns).reduce((acc, key) => {
		acc[key] = new SvelteSet<string>();
		return acc;
	}, {} as Record<string, SvelteSet<string>>);

	function toggleFilter(key: string, value: string) {
		if (filters[key].has(value)) filters[key].delete(value);
		else filters[key].add(value);
	}

	function clearFilters() {
		search = '';
		for (const key in filters) filters[key].clear();
	}

	// Automatically reset visibility when any filter changes
	$effect(() => {
		void search;
		void filters;
		visible = options.pageSize ?? 6;
	});

	const filtered = $derived(
		items.filter((item) => {
				const query = search.trim().toLowerCase();
				const matchesSearch = !query || options.searchFn(item).toLowerCase().includes(query);
				const matchesFilters = Object.entries(options.filterFns).every(([key, fn]) =>
					fn(item, filters[key])
				);
				return matchesSearch && matchesFilters;
			})
	);

	const hasActiveFilters = $derived(
		search.trim().length > 0 ||
		Object.values(filters).some(set => set.size > 0)
	);

	return {
		get search() { return search; },
		set search(v) { search = v; },
		get visible() { return visible; },
		set visible(v) { visible = v; },
		filters,
		toggleFilter,
		clearFilters,
		get filtered() { return filtered; },
		get hasActiveFilters() { return hasActiveFilters; }
	};
}