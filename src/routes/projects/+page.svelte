<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects, allTags } from '$lib/data/projects';
	import type { Project } from '$lib/types';

 let search = $state('');
	let selected = $state(new Set<string>());
	let sort: 'recent' | 'az' | 'za' = $state('recent');
	let visible = $state(6);

	function toggleTag(tag: string) {
		if (selected.has(tag)) selected.delete(tag); else selected.add(tag);
		selected = new Set(selected);
	}

	function clearFilters() {
		search = '';
		selected = new Set();
	}

	$effect(() => {
		void search; void selected; void sort;
		visible = 6;
	});

	function normalized(p: Project) {
		return `${p.title} ${p.summary} ${p.tags.join(' ')} ${p.tech.map(t => t.name).join(' ')}`.toLowerCase();
	}

	const filtered: Project[] = $derived(
		projects
			.filter((p) => {
				const qry = search.trim().toLowerCase();
				const matchesSearch = !qry || normalized(p).includes(qry);
				const matchesTags = selected.size === 0 || [...selected].every(t => p.tags.includes(t));
				return matchesSearch && matchesTags;
			})
			.sort((a, b) => {
				if (sort === 'recent') return (b.year ?? 0) - (a.year ?? 0);
				if (sort === 'az') return a.title.localeCompare(b.title);
				return b.title.localeCompare(a.title);
			})
	);
</script>

<svelte:head>
	<title>Projects | Brandon Lacy</title>
	<meta name="description" content="Selected projects across full‑stack, hardware, and research." />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Projects</h1>
		<p class="mt-3 text-gray-600 text-sm md:text-base">A growing collection of things I’ve built — filter and explore.</p>
	</div>

	<!-- Controls -->
	<div class="mt-6 md:mt-8 grid gap-3 md:gap-4 md:grid-cols-[1fr_auto_auto] items-center">
		<label class="relative block">
			<span class="sr-only">Search projects</span>
			<Icon icon="mage:search" width="18" height="18" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
			<input type="search" bind:value={search} placeholder="Search projects, tech, tags..." class="w-full rounded-xl border bg-white px-9 py-2.5 text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" />
		</label>

		<div class="flex flex-wrap items-center gap-2 md:justify-end">
			{#each allTags as tag}
				<button type="button" onclick={() => toggleTag(tag)} class="inline-flex items-center rounded-full px-3 py-1.5 text-xs md:text-sm ring-1 ring-black/10 shadow-sm transition hover:bg-white {selected.has(tag) ? 'bg-blue-600 text-white ring-blue-700/20' : 'bg-gray-100 text-gray-800'}">
					{tag}
				</button>
			{/each}
			{#if selected.size}
				<button type="button" onclick={clearFilters} class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm text-gray-800 shadow-sm hover:bg-gray-50">
					<Icon icon="mage:close" width="16" height="16" />
					Clear
				</button>
			{/if}
		</div>

		<label class="ml-auto inline-flex items-center gap-2 text-sm md:text-base">
			<span class="text-gray-600">Sort</span>
			<select bind:value={sort} class="rounded-lg border bg-white px-2.5 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
				<option value="recent">Recent</option>
				<option value="az">A–Z</option>
				<option value="za">Z–A</option>
			</select>
		</label>
	</div>

	<!-- Grid -->
	<div class="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
		{#each filtered.slice(0, visible) as p (p.slug)}
			<a href={`/projects/${p.slug}`} class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-2xl">
				<ProjectCard project={p} />
			</a>
		{/each}
	</div>

	{#if filtered.length > visible}
		<div class="mt-6 md:mt-8 flex justify-center">
   <button type="button" onclick={() => (visible += 6)} class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm md:text-base font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
				<Icon icon="mage:chevron-down" width="18" height="18" />
				<span>Show more</span>
			</button>
		</div>
	{:else}
		{#if filtered.length === 0}
			<p class="mt-8 text-center text-gray-500">No projects match your filters.</p>
		{/if}
	{/if}
</section>
