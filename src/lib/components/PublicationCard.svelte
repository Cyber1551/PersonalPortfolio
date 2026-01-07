<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Publication } from '$lib/types';
	const { pub }: { pub: Publication } = $props();
	const hasLinks = $derived(Object.values(pub.links || {}).some((link) => link));
</script>

<article
	class="group relative flex flex-col md:flex-row gap-4 md:gap-8 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-600"
>
	<!-- Year Column -->
	<div class="md:w-20 shrink-0">
		<span class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
			{pub.year}
		</span>
	</div>

	<!-- Content Column -->
	<div class="flex-1 min-w-0">
		<div class="mb-2">
			<h3 class="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
				<a href={`/publications/${pub.slug}`} class="focus:outline-none">
					<span class="absolute inset-0 z-0" aria-hidden="true"></span>
					{pub.title}
				</a>
			</h3>
			<p class="mt-1 text-sm font-medium text-gray-500">
				{pub.authors.join(', ')}
			</p>
		</div>

		<p class="text-sm leading-relaxed text-gray-600 mb-4 italic">
			{pub.venue}
		</p>

		{#if pub.tags?.length}
			<div class="flex flex-wrap gap-x-3 gap-y-1 mb-4">
				{#each pub.tags as tag, i}
					<span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">
						{tag}
					</span>
					{#if i < pub.tags.length - 1}
						<span class="text-[10px] text-gray-200 self-center">•</span>
					{/if}
				{/each}
			</div>
		{/if}

		<!-- Actions -->
		{#if hasLinks}
			<div class="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-gray-100">
				{#if pub.links?.pdf}
					<a
						href={pub.links.pdf}
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm transition hover:bg-emerald-500"
					>
						<Icon icon="mage:file-fill" width="14" height="14" />
						<span>PDF</span>
					</a>
				{/if}
				{#if pub.links?.doi}
					<a
						href={pub.links.doi}
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm transition hover:bg-gray-800"
					>
						<Icon icon="mage:external-link" width="14" height="14" />
						<span>DOI</span>
					</a>
				{/if}
				{#if pub.links?.arxiv}
					<a
						href={pub.links.arxiv}
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-700 shadow-xs transition hover:bg-gray-50"
					>
						<Icon icon="mage:external-link" width="14" height="14" />
						<span>arXiv</span>
					</a>
				{/if}
				{#if pub.links?.code}
					<a
						href={pub.links.code}
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-700 shadow-xs transition hover:bg-gray-50"
					>
						<Icon icon="mage:github" width="14" height="14" />
						<span>Source</span>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</article>
