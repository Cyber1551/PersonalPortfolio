<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { createCollectionManager } from '$lib/helpers/collection.svelte';
	import CollectionSearch from '$lib/components/CollectionSearch.svelte';
	import CollectionFilter from '$lib/components/CollectionFilter.svelte';

	let { data }: { data: PageData } = $props();
	const LIST_SIZE = 8;

	const manager = createCollectionManager(data.projects, {
		searchFn: (p) => `${p.title} ${p.summary} ${p.tags.join(' ')} ${p.tech.map((t) => t.name).join(' ')}`,
		filterFns: {
			tags: (p, selected) => selected.size === 0 || [...selected].every((t) => p.tags.includes(t)),
			tech: (p, selected) => selected.size === 0 || [...selected].every((t) => p.tech.some((tech) => tech.name === t))
		}
	});
</script>

<svelte:head>
	<title>Projects | Brandon Lacy</title>
	<meta name="description" content="Selected projects across full‑stack, hardware, and research." />
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">Projects</h1>
		<p class="mt-3 text-sm text-gray-600 md:text-base">
			A growing collection of things I’ve worked on.
		</p>
	</div>

	<!-- Controls -->
	<div class="mt-8 space-y-6">
		<div class="flex flex-col items-center gap-4 md:flex-row">
			<CollectionSearch
				bind:value={manager.search}
				placeholder="Search by name, tech, description, or tags..."
				label="Search projects"
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
				label="Tech"
				items={data.allTech}
				selected={manager.filters.tech}
				onToggle={(tag) => manager.toggleFilter('tech', tag)}
				activeClass="bg-indigo-600 shadow-indigo-500/20"
			/>
		</div>
	</div>

	<!-- Grid -->
	<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 md:grid-cols-3 md:gap-6 xl:grid-cols-4 pb-5">
		{#each manager.filtered.slice(0, manager.visible) as p (p.slug)}
			<ProjectCard project={p} />
		{/each}
	</div>

	{#if manager.filtered.length > manager.visible}
		<div class="mt-6 flex justify-center md:mt-8">
			<button
				type="button"
				onclick={() => (manager.visible += LIST_SIZE)}
				class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-blue-700/20 transition ring-inset hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:text-base"
			>
				<Icon icon="mage:chevron-down" width="18" height="18" />
				<span>Show more</span>
			</button>
		</div>
	{:else if manager.filtered.length === 0}
		<p class="mt-8 text-center text-gray-500">No projects match your filters.</p>
	{/if}
</section>
