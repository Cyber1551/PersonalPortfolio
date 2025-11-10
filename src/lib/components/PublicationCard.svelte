<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Publication } from '$lib/types';
	const { pub }: { pub: Publication } = $props();
</script>

<article class="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm transition hover:shadow-md">
	<!-- Header / placeholder -->
	<div class="relative w-full bg-gradient-to-br from-emerald-50 via-white to-sky-50">
		<div class="aspect-[16/9] flex items-center justify-center">
			{#if pub.image}
				<img src={pub.image} alt="" class="h-full w-full object-cover" loading="lazy" />
			{:else}
				<Icon icon="mage:clipboard-2" width="40" height="40" class="text-emerald-600" />
			{/if}
		</div>
		<div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5"></div>
	</div>

	<!-- Body -->
	<div class="flex flex-1 flex-col gap-3 p-4 md:p-5">
		<header class="space-y-1">
			<h3 class="text-base md:text-lg font-semibold text-gray-900 line-clamp-2">{pub.title}</h3>
			<p class="text-xs md:text-sm text-gray-500 line-clamp-2">{pub.authors.join(', ')}</p>
			<p class="text-xs md:text-sm text-gray-500">{pub.venue} · {pub.year}</p>
		</header>

		{#if pub.tags?.length}
			<ul class="mt-1 flex flex-wrap gap-2">
				{#each pub.tags.slice(0, 6) as tag (tag)}
					<li class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs md:text-sm text-gray-700 ring-1 ring-black/5">{tag}</li>
				{/each}
			</ul>
		{/if}

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Actions -->
		<div class="flex flex-wrap items-center gap-2">
			{#if pub.links?.pdf}
				<a href={pub.links.pdf} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-xs md:text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
					<Icon icon="mage:download" width="16" height="16" />
					<span>PDF</span>
				</a>
			{/if}
			{#if pub.links?.doi}
				<a href={pub.links.doi} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
					<Icon icon="mage:external-link" width="16" height="16" />
					<span>DOI</span>
				</a>
			{/if}
			{#if pub.links?.arxiv}
				<a href={pub.links.arxiv} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
					<Icon icon="mage:external-link" width="16" height="16" />
					<span>arXiv</span>
				</a>
			{/if}
			{#if pub.links?.code}
				<a href={pub.links.code} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
					<Icon icon="mage:github" width="16" height="16" />
					<span>Code</span>
				</a>
			{/if}
		</div>
	</div>

	<div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-black/10"></div>
</article>
