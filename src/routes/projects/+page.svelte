<script lang="ts">
	import Icon from '@iconify/svelte';
	import { projects, allTags, allTech } from '$lib/data/projects';
	import type { Project } from '$lib/types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let search = $state('');
	let selectedTags = $state(new Set<string>());
	let selectedTech = $state(new Set<string>());
	let sort: 'recent' | 'az' | 'za' = $state('recent');
	let visible = $state(6);

	function toggleTag(tag: string) {
		if (selectedTags.has(tag)) selectedTags.delete(tag);
		else selectedTags.add(tag);
		selectedTags = new Set(selectedTags);
	}

	function toggleTech(tech: string) {
		if (selectedTech.has(tech)) selectedTech.delete(tech);
		else selectedTech.add(tech);
		selectedTech = new Set(selectedTech);
	}

	function clearFilters() {
		search = '';
		selectedTags = new Set();
		selectedTech = new Set();
	}

	$effect(() => {
		void search;
		void selectedTags;
		void selectedTech;
		void sort;
		visible = 6;
	});

	function normalized(p: Project) {
		return `${p.title} ${p.summary} ${p.tags.join(' ')} ${p.tech.map((t) => t.name).join(' ')}`.toLowerCase();
	}

	const filtered: Project[] = $derived(
		projects
			.filter((p) => {
				const qry = search.trim().toLowerCase();
				const matchesSearch = !qry || normalized(p).includes(qry);
				const matchesTags = selectedTags.size === 0 || [...selectedTags].every((t) => p.tags.includes(t));
				const matchesTech =
					selectedTech.size === 0 || [...selectedTech].every((t) => p.tech.some((tech) => tech.name === t));
				return matchesSearch && matchesTags && matchesTech;
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
		<p class="mt-3 text-gray-600 text-sm md:text-base">A growing collection of things I’ve worked on.</p>
	</div>

	<!-- Controls -->
	<div class="mt-8 space-y-6">
		<div class="flex flex-col md:flex-row gap-4 items-center">
			<label class="relative flex-1">
				<span class="sr-only">Search projects</span>
				<Icon
					icon="mage:search"
					width="20"
					height="20"
					class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
				/>
				<input
					type="search"
					bind:value={search}
					placeholder="Search by name, tech, or description..."
					class="w-full rounded-2xl border-gray-200 bg-white pl-11 pr-4 py-3 text-sm md:text-base shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
				/>
			</label>

			<div class="flex items-center gap-3 self-end md:self-auto">
				<span class="text-sm font-semibold text-gray-500">Sort:</span>
				<select
					bind:value={sort}
					class="cursor-pointer rounded-xl border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
				>
					<option value="recent">Most Recent</option>
					<option value="az">Alphabetical (A-Z)</option>
					<option value="za">Alphabetical (Z-A)</option>
				</select>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-3 md:flex-row md:items-center">
				<span class="min-w-[60px] text-xs font-bold uppercase tracking-widest text-gray-400">Tags</span>
				<div class="flex flex-wrap gap-2">
					{#each allTags as tag}
						<button
							type="button"
							onclick={() => toggleTag(tag)}
							class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {selectedTags.has(tag)
								? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
								: 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'}"
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-3 md:flex-row md:items-center">
				<span class="min-w-[60px] text-xs font-bold uppercase tracking-widest text-gray-400">Tech</span>
				<div class="flex flex-wrap gap-2">
					{#each allTech as tech}
						<button
							type="button"
							onclick={() => toggleTech(tech)}
							class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {selectedTech.has(tech)
								? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
								: 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'}"
						>
							{tech}
						</button>
					{/each}
				</div>
			</div>

			{#if selectedTags.size || selectedTech.size || search}
				<div class="pt-2">
					<button
						type="button"
						onclick={clearFilters}
						class="inline-flex items-center gap-1.5 text-sm font-bold text-red-500 transition-colors hover:text-red-600"
					>
						<Icon icon="mage:close" width="18" height="18" />
						<span>Clear all filters</span>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Grid -->
	<div class="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
		{#each filtered.slice(0, visible) as p (p.slug)}
			<ProjectCard project={p} />
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
