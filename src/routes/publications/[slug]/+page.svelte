<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import {
		makeAPACitation,
		makeBibTeXCitation,
		makeChicagoCitation,
		makeIEEECitation,
		makeMLACitation
	} from '$lib/helpers/citations';
	let { data }: { data: PageData } = $props();
	const pub = $derived(data.publication);

	const citations = $derived([
		{ name: "IEEE", text: makeIEEECitation(pub) },
		{ name: "APA", text: makeAPACitation(pub) },
		{ name: "BibTex", text: makeBibTeXCitation(pub) },
		{ name: "MLA", text: makeMLACitation(pub) },
		{ name: "Chicago", text: makeChicagoCitation(pub) },
	]);

</script>

<svelte:head>
	<title>{pub ? `${pub.title} | Publications | Brandon Lacy` : 'Publication | Brandon Lacy'}</title>
	<meta name="description" content={pub ? pub.abstract ?? `${pub.title} — ${pub.venue}` : 'Publication details'} />
</svelte:head>

<section class="flex h-full flex-1 flex-col overflow-hidden px-4 py-4 md:px-[10vw] md:py-6">
	<!-- Navigation -->
	<nav class="mb-4 shrink-0">
		<a
			href="/publications"
			class="inline-flex items-center gap-2 text-sm text-gray-700 transition-colors hover:text-gray-900 md:text-base"
		>
			<Icon icon="mage:chevron-left" width="18" height="18" />
			<span>Back to Publications</span>
		</a>
	</nav>

	{#if pub}
		<div class="grid min-h-0 flex-1 gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
			<!-- Left Column: Info and Abstract -->
			<div class="flex min-h-0 flex-col">
				<header class="shrink-0">
					<div class="flex items-center gap-3">
						<span
							class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-700 uppercase"
						>
							{pub.year}
						</span>
						<h1 class="text-2xl font-black tracking-tight text-gray-900 md:text-4xl">
							{pub.title}
						</h1>
					</div>

					<p class="mt-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
						{pub.authors.join(', ')}
					</p>

					{#if pub.tags?.length}
						<div class="mt-3 flex flex-wrap gap-x-2 gap-y-1">
							{#each pub.tags as tag, i}
								<span class="text-xs font-bold whitespace-nowrap text-gray-400 uppercase tracking-widest"
									>{tag}</span
								>
								{#if i < pub.tags.length - 1}
									<span class="text-[10px] text-gray-300">•</span>
								{/if}
							{/each}
						</div>
					{/if}

					<p class="mt-4 text-sm leading-relaxed text-gray-600 md:text-base italic">
						{pub.venue}
					</p>

					<!-- Actions -->
					<div class="mt-6 flex flex-wrap items-center gap-2">
						{#if pub.links?.pdf}
							<a
								href={pub.links.pdf}
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500 md:text-sm"
							>
								<Icon icon="mage:file-fill" width="16" height="16" />
								<span>Download PDF</span>
							</a>
						{/if}
						{#if pub.links?.doi}
							<a
								href={pub.links.doi}
								target="_blank"
								rel="noreferrer"
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
								rel="noreferrer"
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
								rel="noreferrer"
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
								rel="noreferrer"
								class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 md:text-sm"
							>
								<Icon icon="mage:github" width="16" height="16" />
								<span>Source Code</span>
							</a>
						{/if}
					</div>
				</header>

				<!-- Scrollable Abstract -->
				<div class="mt-8 flex min-h-0 flex-1 flex-col">
					<h2 class="mb-4 shrink-0 text-lg font-bold uppercase tracking-widest text-gray-900">
						Abstract
					</h2>
					<div class="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 mb-10">
						<article class="prose prose-zinc prose-sm max-w-none md:prose-base">
							<p>{pub.abstract ?? 'Abstract coming soon.'}</p>
							<div class="h-20"></div>
						</article>
					</div>
				</div>
			</div>

			<!-- Right Column: Citations -->
			<div class="flex min-h-0 flex-col gap-8">
				<!-- Sidebar: Citations -->
				<div class="flex min-h-0 flex-1 flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-black/5 mb-10">
					<h3 class="mb-4 shrink-0 text-lg font-bold uppercase tracking-widest text-gray-900">
						Citations
					</h3>
					<div class="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
						<div class="space-y-6">
							{#each citations as citation (citation.name)}
								<div class="space-y-2">
									<div class="flex items-center justify-between">
										<span class="text-xs font-black uppercase tracking-widest text-emerald-600"
											>{citation.name}</span
										>
										<CopyButton text={citation.text} />
									</div>
									<div class="rounded-xl border border-black/5 bg-white p-3 shadow-sm">
										<pre
											class="whitespace-pre-wrap break-all text-[10px] leading-relaxed text-gray-600"
										><code>{citation.text}</code></pre>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<div class="rounded-full bg-red-50 p-6 text-red-500">
				<Icon icon="mage:clipboard-2" width="64" height="64" />
			</div>
			<h2 class="mt-6 text-2xl font-bold text-gray-900">Publication not found</h2>
			<p class="mt-2 text-gray-600">The publication you are looking for doesn't exist.</p>
			<a
				href="/publications"
				class="mt-8 rounded-full bg-gray-900 px-8 py-3 font-bold text-white transition hover:bg-gray-800"
			>
				Return to Publications
			</a>
		</div>
	{/if}
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
