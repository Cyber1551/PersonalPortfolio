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
	<meta name="description" content={pub ? pub.abstract ?? `${pub.title} — ${pub.conference}` : 'Publication details'} />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
	<a href="/publications" class="justify-self-start inline-flex items-center gap-2 text-sm md:text-base text-gray-700 hover:text-gray-900">
		<Icon icon="mage:chevron-left" width="18" height="18" />
		<span>Back to Publications</span>
	</a>

	{#if pub}
		<header class="mt-4 md:mt-6">
			<h1 class="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">{pub.title}</h1>
			<p class="mt-2 text-sm md:text-base text-gray-700">{pub.authors}</p>
			<p class="mt-1 text-sm text-gray-500">{pub.conference} · {pub.year}</p>

			<!-- Actions -->
			<div class="mt-4 flex flex-wrap items-center gap-3">
				{#if pub.links?.pdf}
					<a href={pub.links.pdf} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm md:text-base font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
						<Icon icon="mage:download" width="18" height="18" />
						<span>PDF</span>
					</a>
				{/if}
				{#if pub.links?.url}
					<a href={pub.links.url} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm md:text-base font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
						<Icon icon="mage:external-link" width="18" height="18" />
						<span>URL</span>
					</a>
				{/if}
				{#if pub.links?.doi}
					<a href={pub.links.doi} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm md:text-base font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
						<Icon icon="mage:external-link" width="18" height="18" />
						<span>DOI</span>
					</a>
				{/if}
			</div>
		</header>

		<div class="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
			<!-- Abstract -->
			<article class="prose prose-zinc max-w-none md:prose-lg">
				<h2>Abstract</h2>
				<p>{pub.abstract ?? 'Abstract coming soon.'}</p>
			</article>

			<!-- Citations -->
			<aside class="rounded-2xl bg-gray-50 p-4 md:p-6 ring-1 ring-black/5">
				{#each citations as citation (citation.name)}
					<div class="inline-flex w-full justify-between"><h3 class="text-base md:text-lg font-semibold text-gray-900">{citation.name}</h3><CopyButton text={citation.text} /></div>
					<pre class="mb-4 mt-1 rounded-lg bg-white p-3 text-xs text-gray-700 ring-1 ring-black/5 whitespace-pre-wrap break-all overflow-x-auto"><code>{citation.text}</code></pre>
				{/each}
			</aside>
		</div>
	{:else}
		<p class="mt-10 text-center text-gray-500">Publication not found. <a href="/publications" class="text-blue-600 hover:underline">Back to list</a></p>
	{/if}
</section>
