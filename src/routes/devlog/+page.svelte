<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import DevlogCard from '$lib/components/DevlogCard.svelte';
	import SeriesCard from '$lib/components/SeriesCard.svelte';
	import { createCollectionManager } from '$lib/helpers/collection.svelte';
	import CollectionSearch from '$lib/components/CollectionSearch.svelte';
	import CollectionFilter from '$lib/components/CollectionFilter.svelte';

	let { data }: { data: PageData } = $props();

	let activeView = $state<'recent' | 'series'>('recent');

	const manager = createCollectionManager(data.devPosts, {
		searchFn: (p) => `${p.title} ${p.summary} ${p.tags.join(' ')} ${p.series ?? ''}`,
		filterFns: {
			tags: (p, selected) => selected.size === 0 || [...selected].every((t) => p.tags.includes(t)),
			series: (p, selected) => selected.size === 0 || (p.series !== undefined && selected.has(p.series))
		},
		pageSize: 10
	});

	function selectSeries(name: string | null) {
		manager.filters.series.clear();
		if (name) {
			manager.filters.series.add(name);
			activeView = 'recent';
		}
	}

	$effect(() => {
		const seriesQuery = $page.url.searchParams.get('series');
		if (seriesQuery) {
			selectSeries(seriesQuery);
		}
	});
</script>

<svelte:head>
	<title>Development Blog | Brandon Lacy</title>
	<meta
		name="description"
		content="Notes and work-in-progress updates across hardware, software, and research."
	/>
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">Development Logs</h1>
		<p class="mt-2 text-sm text-gray-600 md:mt-3 md:text-base">
			Build logs, experiments, and notes.
		</p>
	</div>

	<!-- View Toggle -->
	<div class="mt-8 flex justify-center">
		<div class="inline-flex rounded-xl bg-gray-100 p-1 ring-1 ring-black/5">
			<button
				onclick={() => (activeView = 'recent')}
				class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition {activeView ===
				'recent'
					? 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-black/5'
					: 'text-gray-500 hover:text-gray-700'}"
			>
				<Icon icon="mage:clock" width="18" height="18" />
				<span>Recent Activity</span>
			</button>
			<button
				onclick={() => (activeView = 'series')}
				class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition {activeView ===
				'series'
					? 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-black/5'
					: 'text-gray-500 hover:text-gray-700'}"
			>
				<Icon icon="mage:folder-2" width="18" height="18" />
				<span>Project Series</span>
			</button>
		</div>
	</div>

	{#if activeView === 'recent'}
		<!-- Controls -->
		<div class="mt-8 space-y-6">
			<div class="flex flex-col items-center gap-4 md:flex-row">
				<CollectionSearch
					bind:value={manager.search}
					placeholder="Search by title, series, or tags..."
					label="Search logs"
				/>

				{#if manager.hasActiveFilters}
					<button
						type="button"
						onclick={manager.clearFilters}
						class="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-red-500 transition-colors hover:text-red-600"
					>
						<Icon icon="mage:close" width="18" height="18" />
						<span>Clear all</span>
					</button>
				{/if}
			</div>

			<div class="flex flex-col gap-4">
				<CollectionFilter
					label="Tags"
					items={data.allTags}
					selected={manager.filters.tags}
					onToggle={(tag) => manager.toggleFilter('tags', tag)}
				/>
				<CollectionFilter
					label="Series"
					items={data.series.map((s) => s.name)}
					selected={manager.filters.series}
					onToggle={(name) => manager.toggleFilter('series', name)}
					activeClass="bg-indigo-600 shadow-indigo-500/20"
				/>
			</div>
		</div>

		<!-- Chronological List -->
		<ol class="mt-8 space-y-4 md:mt-10 md:space-y-5">
			{#each manager.filtered.slice(0, manager.visible) as post (post.slug)}
				<DevlogCard {post} onSelectSeries={selectSeries} />
			{/each}
		</ol>

		{#if manager.filtered.length > manager.visible}
			<div class="mt-6 flex justify-center md:mt-8">
				<button
					type="button"
					onclick={() => (manager.visible += 10)}
					class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-blue-700/20 transition ring-inset hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:text-base"
				>
					<Icon icon="mage:chevron-down" width="18" height="18" />
					<span>Show more</span>
				</button>
			</div>
		{:else if manager.filtered.length === 0}
			<p class="mt-8 text-center text-gray-500">No logs match your search or filters.</p>
		{/if}
	{:else}
		<!-- Series View -->
		<div class="mt-8 grid gap-6 md:mt-10 md:grid-cols-2">
			{#each data.series as series (series.name)}
				<SeriesCard {series} onSelect={selectSeries} />
			{/each}
		</div>
	{/if}
</section>
