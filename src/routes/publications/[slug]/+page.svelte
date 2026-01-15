<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import {
		formatDOI,
		makeAPACitation,
		makeBibTeXCitation,
		makeChicagoCitation,
		makeIEEECitation,
		makeMLACitation
	} from '$lib/helpers/citations';
	let { data }: { data: PageData } = $props();
	const pub = $derived(data.publication);

	const citations = $derived([
		{ name: 'IEEE', text: makeIEEECitation(pub) },
		{ name: 'APA', text: makeAPACitation(pub) },
		{ name: 'BibTex', text: makeBibTeXCitation(pub) },
		{ name: 'MLA', text: makeMLACitation(pub) },
		{ name: 'Chicago', text: makeChicagoCitation(pub) }
	]);
</script>

<svelte:head>
	<title>{pub.title} | Publications | Brandon Lacy</title>
	<meta name="description" content={pub.abstract ?? `${pub.title} — ${pub.venue}`} />
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Navigation -->
	<nav class="mb-6">
		<a
			href="/publications"
			class="inline-flex items-center gap-2 text-sm text-gray-700 transition-colors hover:text-gray-900 md:text-base"
		>
			<Icon icon="mage:chevron-left" width="18" height="18" />
			<span>Back to Publications</span>
		</a>
	</nav>

	<header class="mb-10">
		<div class="mb-3 flex items-center gap-2">
			<span
				class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-700/10"
			>
				<Icon icon="mage:clipboard-2" width="12" height="12" />
				{pub.venue}
				<span class="ml-0.5 opacity-60">{pub.year}</span>
			</span>
		</div>

		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">{pub.title}</h1>

		<div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 md:text-base">
			<span>{pub.authors.join(', ')}</span>
			{#if pub.tags?.length}
				<span class="text-gray-300">•</span>
				<ul class="flex flex-wrap items-center gap-2">
					{#each pub.tags as tag (tag)}
						<li
							class="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600"
						>
							{tag}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</header>

	<div class="grid min-h-0 flex-1 gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
		<!-- Left Column: Info and Abstract -->
		<div class="flex min-h-0 flex-col">
			<!-- Actions -->
			<div class="mb-8 flex flex-wrap items-center gap-2">
				{#if pub.links?.pdf}
					<a
						href={pub.links.pdf}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500 md:text-sm"
					>
						<Icon icon="mage:file-fill" width="16" height="16" />
						<span>Download PDF</span>
					</a>
				{/if}
				{#if pub.links?.doi}
					<a
						href={formatDOI(pub.links.doi)}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-gray-800 md:text-sm"
					>
						<Icon icon="mage:external-link" width="16" height="16" />
						<span>View via DOI</span>
					</a>
				{/if}
				{#if pub.links?.url}
					<a
						href={pub.links.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 md:text-sm"
					>
						<Icon icon="mage:external-link" width="16" height="16" />
						<span>Direct Link</span>
					</a>
				{/if}
				{#if pub.links?.arxiv}
					<a
						href={pub.links.arxiv}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 md:text-sm"
					>
						<Icon icon="mage:external-link" width="16" height="16" />
						<span>arXiv</span>
					</a>
				{/if}
				{#if pub.links?.code}
					<a
						href={pub.links.code}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 md:text-sm"
					>
						<Icon icon="mage:github" width="16" height="16" />
						<span>Source Code</span>
					</a>
				{/if}
			</div>

			<!-- Scrollable Abstract -->
			<div class="flex min-h-0 flex-1 flex-col">
				<h2 class="mb-4 shrink-0 text-lg font-bold tracking-widest text-gray-900 uppercase">
					Abstract
				</h2>
				<div class="scrollbar-thin scrollbar-thumb-gray-200 mb-10 flex-1 overflow-y-auto pr-4">
					<article class="prose prose-sm max-w-none prose-zinc md:prose-base">
						<p>{pub.abstract ?? 'Abstract coming soon.'}</p>
						<div class="h-20"></div>
					</article>
				</div>
			</div>
		</div>

		<!-- Right Column: Citations -->
		<div class="flex min-h-0 flex-col gap-8">
			<!-- Sidebar: Citations -->
			<div
				class="mb-10 flex min-h-0 flex-1 flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-black/5"
			>
				<h3 class="mb-4 shrink-0 text-lg font-bold tracking-widest text-gray-900 uppercase">
					Citations
				</h3>
				<div class="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto pr-2">
					<div class="space-y-6">
						{#each citations as citation (citation.name)}
							<div class="space-y-2">
								<div class="flex items-center justify-between">
									<span class="text-xs font-black tracking-widest text-emerald-600 uppercase"
										>{citation.name}</span
									>
									<CopyButton text={citation.text} />
								</div>
								<div class="rounded-xl border border-black/5 bg-white p-3 shadow-sm">
									<pre
										class="text-[10px] leading-relaxed break-all whitespace-pre-wrap text-gray-600"><code
											>{citation.text}</code
										></pre>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Custom scrollbar styles for a cleaner look */
	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: #e5e7eb;
		border-radius: 10px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: #d1d5db;
	}
</style>
