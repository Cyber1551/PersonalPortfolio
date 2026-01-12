<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Publication } from '$lib/types';
	const { pub }: { pub: Publication } = $props();
	const hasLinks = $derived(Object.values(pub.links || {}).some((link) => link));
</script>

<article
	class="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-600 hover:border-emerald-200 hover:shadow-md md:flex-row md:gap-8"
>
	<!-- Year Column -->
	<div class="shrink-0 md:w-20">
		<span
			class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-700 uppercase"
		>
			{pub.year}
		</span>
	</div>

	<!-- Content Column -->
	<div class="min-w-0 flex-1">
		<div class="mb-2">
			<h3 class="text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
				<a href={`/publications/${pub.slug}`} class="focus:outline-none">
					<span class="absolute inset-0 z-0" aria-hidden="true"></span>
					{pub.title}
				</a>
			</h3>
			<p class="mt-1 text-sm font-medium text-gray-500">
				{pub.authors.join(', ')}
			</p>
		</div>

		<p class="mb-4 text-sm leading-relaxed text-gray-600 italic">
			{pub.venue}
		</p>

		{#if pub.tags?.length}
			<div class="mb-4 flex flex-wrap gap-x-3 gap-y-1">
				{#each pub.tags as tag, i (tag)}
					<span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
						{tag}
					</span>
					{#if i < pub.tags.length - 1}
						<span class="self-center text-[10px] text-gray-200">•</span>
					{/if}
				{/each}
			</div>
		{/if}

		<!-- Actions -->
		{#if hasLinks}
			<div class="relative z-10 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
				{#if pub.links?.pdf}
					<a
						href={pub.links.pdf}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm transition hover:bg-emerald-500"
					>
						<Icon icon="mage:file-fill" width="14" height="14" />
						<span>PDF</span>
					</a>
				{/if}
				{#if pub.links?.doi}
					<a
						href={pub.links.doi}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm transition hover:bg-gray-800"
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
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold text-gray-700 transition hover:bg-gray-50"
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
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black tracking-widest text-gray-700 uppercase shadow-xs transition hover:bg-gray-50"
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
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black tracking-widest text-gray-700 uppercase shadow-xs transition hover:bg-gray-50"
					>
						<Icon icon="mage:github" width="14" height="14" />
						<span>Source</span>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</article>
