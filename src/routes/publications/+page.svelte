<script lang="ts">
	import Icon from '@iconify/svelte';
	import { allTags } from '$lib/data/publications';
	import PublicationCard from '$lib/components/PublicationCard.svelte';
	import type { PageData } from './$types';
	import type { Publication } from '$lib/types';

	let { data }: { data: PageData } = $props();

	let search = $state('');
	let selectedTags = $state(new Set<string>());
	let sort: 'recent' | 'az' | 'za' = $state('recent');
	let visible = $state(6);

	function toggleTag(tag: string) {
		if (selectedTags.has(tag)) selectedTags.delete(tag);
		else selectedTags.add(tag);
		selectedTags = new Set(selectedTags);
	}

	function clearFilters() {
		search = '';
		selectedTags = new Set();
	}

	$effect(() => {
		void search;
		void selectedTags;
		void sort;
		visible = 6;
	});

	function normalized(p: Publication) {
		return `${p.title} ${p.venue} ${p.authors.join(' ')} ${p.tags?.join(' ') ?? ''}`.toLowerCase();
	}

	const filtered: Publication[] = $derived(
		data.publications
			.filter((p) => {
				const qry = search.trim().toLowerCase();
				const matchesSearch = !qry || normalized(p).includes(qry);
				const matchesTags =
					selectedTags.size === 0 || [...selectedTags].every((t) => p.tags?.includes(t));
				return matchesSearch && matchesTags;
			})
			.sort((a, b) => {
				if (sort === 'recent') return b.year - a.year;
				if (sort === 'az') return a.title.localeCompare(b.title);
				return b.title.localeCompare(a.title);
			})
	);
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
			<label class="relative flex-1">
				<span class="sr-only">Search publications</span>
				<Icon
					icon="mage:search"
					width="20"
					height="20"
					class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
				/>
				<input
					type="search"
					bind:value={search}
					placeholder="Search by title, author, or venue..."
					class="w-full rounded-2xl border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 md:text-base"
				/>
			</label>

			<div class="flex items-center gap-3 self-end md:self-auto">
				<span class="text-sm font-semibold text-gray-500">Sort:</span>
				<select
					bind:value={sort}
					class="cursor-pointer rounded-xl border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
				>
					<option value="recent">Most Recent</option>
					<option value="az">Alphabetical (A-Z)</option>
					<option value="za">Alphabetical (Z-A)</option>
				</select>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-3 md:flex-row md:items-center">
				<span class="min-w-[60px] text-xs font-bold uppercase tracking-widest text-gray-400"
					>Tags</span
				>
				<div class="flex flex-wrap gap-2">
					{#each allTags as tag}
						<button
							type="button"
							onclick={() => toggleTag(tag)}
							class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {selectedTags.has(
								tag
							)
								? 'bg-emerald-600 text-white shadow-emerald-500/20 shadow-md'
								: 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}"
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>

			{#if selectedTags.size || search}
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

	<!-- List -->
	<div class="mt-6 flex flex-col gap-4 md:mt-8">
		{#each filtered.slice(0, visible) as pub (pub.slug)}
			<PublicationCard {pub} />
		{/each}
	</div>

	{#if filtered.length > visible}
		<div class="mt-6 flex justify-center md:mt-8">
			<button
				type="button"
				onclick={() => (visible += 6)}
				class="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-emerald-700/20 ring-inset transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 md:text-base"
			>
				<Icon icon="mage:chevron-down" width="18" height="18" />
				<span>Show more</span>
			</button>
		</div>
	{:else if filtered.length === 0}
		<p class="mt-8 text-center text-gray-500">No publications match your filters.</p>
	{/if}
</section>
