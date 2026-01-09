<script lang="ts">
	import Icon from '@iconify/svelte';
	import PublicationCard from '$lib/components/PublicationCard.svelte';
	import type { PageData } from './$types';
	import { createCollectionManager } from '$lib/helpers/collection.svelte';
	import CollectionSearch from '$lib/components/CollectionSearch.svelte';
	import CollectionFilter from '$lib/components/CollectionFilter.svelte';

	let { data }: { data: PageData } = $props();
	const LIST_SIZE = 6;

	const manager = createCollectionManager(data.publications, {
		searchFn: (p) => `${p.title} ${p.venue} ${p.authors.join(' ')} ${p.tags?.join(' ') ?? ''}`,
		filterFns: {
			tags: (p, selected) => selected.size === 0 || [...selected].every((t) => p.tags?.includes(t))
		}
	});

</script>

<svelte:head>
	<title>Publications | Brandon Lacy</title>
	<meta name="description" content="Selected publications and preprints." />
</svelte:head>

<section class="flex min-h-0 flex-1 flex-col px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">Publications</h1>
		<p class="mt-3 text-sm text-gray-600 md:text-base">Selected publications and research work.</p>
	</div>

	<!-- Controls -->
	<div class="mt-8 space-y-6">
		<div class="flex flex-col items-center gap-4 md:flex-row">
			<CollectionSearch
				bind:value={manager.search}
				placeholder="Search by title, venue, authors, or tags..."
				label="Search publications"
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
		</div>
	</div>

	<!-- List -->
	<div class="mt-6 flex flex-col gap-4 md:mt-8">
		{#each manager.filtered.slice(0, manager.visible) as pub (pub.slug)}
			<PublicationCard {pub} />
		{/each}
	</div>

	{#if manager.filtered.length > manager.visible}
		<div class="mt-6 flex justify-center md:mt-8">
			<button
				type="button"
				onclick={() => (manager.visible += LIST_SIZE)}
				class="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-emerald-700/20 ring-inset transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 md:text-base"
			>
				<Icon icon="mage:chevron-down" width="18" height="18" />
				<span>Show more</span>
			</button>
		</div>
	{:else if manager.filtered.length === 0}
		<p class="mt-8 text-center text-gray-500">No publications match your filters.</p>
	{/if}
</section>
