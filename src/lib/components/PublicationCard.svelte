<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Publication } from '$lib/types';
	import { formatDOI } from '$lib/helpers/citations';
	const { pub }: { pub: Publication } = $props();
	const hasLinks = $derived(Object.values(pub.links || {}).some((link) => link));
</script>

<article
 class="group relative flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-600 hover:-translate-y-0.5 hover:shadow-md hover:ring-emerald-600/10 md:p-5"
>
	<!-- Clickable Overlay -->
	<a href={`/publications/${pub.slug}`} class="absolute inset-0 z-0 rounded-2xl" aria-label={pub.title}></a>

	<div class="relative z-10 flex flex-col gap-3 pointer-events-none md:flex-row md:items-start md:justify-between">
		<div class="min-w-0 flex-1">
			<div class="flex items-center gap-2">
				<h3 class="text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-600 md:text-lg">
					{pub.title}
				</h3>
			</div>
			
			<p class="mt-1 text-sm font-medium text-gray-500">
				{pub.authors.join(', ')}
			</p>

			<p class="mt-1 text-sm leading-relaxed text-gray-600 italic">
				{pub.venue}
			</p>

			<div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
				<span
					class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-700 uppercase ring-1 ring-emerald-700/10"
				>
					{pub.year}
				</span>
			</div>
		</div>

		<!-- Tags -->
		{#if pub.tags?.length}
			<ul class="flex flex-wrap items-center gap-1.5 md:justify-end">
				{#each pub.tags as tag (tag)}
					<li
						class="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-gray-500 uppercase transition-colors group-hover:bg-gray-100 group-hover:text-gray-700"
					>
						{tag}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Actions -->
	{#if hasLinks}
		<div class="relative z-20 mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
			{#if pub.links?.pdf}
				<a
					href={pub.links.pdf}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
				>
					<Icon icon="mage:file-fill" width="14" height="14" />
					<span>PDF</span>
				</a>
			{/if}
			{#if pub.links?.doi}
				<a
					href={formatDOI(pub.links.doi)}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
				>
					<Icon icon="mage:external-link" width="14" height="14" />
					<span>DOI</span>
				</a>
			{/if}
			{#if pub.links?.url}
				<a
					href={pub.links.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
				>
					<Icon icon="mage:external-link" width="14" height="14" />
					<span>Direct Link</span>
				</a>
			{/if}
			{#if pub.links?.arxiv}
				<a
					href={pub.links.arxiv}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black tracking-widest text-gray-700 uppercase shadow-xs transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
				>
					<Icon icon="mage:external-link" width="14" height="14" />
					<span>arXiv</span>
				</a>
			{/if}
			{#if pub.links?.code}
				<a
					href={pub.links.code}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black tracking-widest text-gray-700 uppercase shadow-xs transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
				>
					<Icon icon="mage:github" width="14" height="14" />
					<span>Source</span>
				</a>
			{/if}
		</div>
	{/if}
</article>
