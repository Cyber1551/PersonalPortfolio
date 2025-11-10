<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Publications | Brandon Lacy</title>
	<meta name="description" content="Selected publications and preprints." />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
	<div class="text-center">
		<h1 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Publications</h1>
	</div>

	<ol class="mt-6 md:mt-8 space-y-5 md:space-y-6">
		{#each data.publications as { slug, title, conference, year, authors, links} (slug)}
			<li class="rounded-2xl bg-white p-4 md:p-5 ring-1 ring-black/5 shadow-sm transition hover:shadow-md">
				<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
					<div class="min-w-0">
						<a href={`/publications/${slug}`} class="inline-flex text-base md:text-lg font-semibold text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
							{title}<Icon icon="mdi:open-in-new" width="20" height="20" class="ml-2 mt-1" />
						</a>
						<p class="mt-1 text-sm md:text-base text-gray-700">{authors}</p>
						<p class="text-sm text-gray-500">{conference} · {year}</p>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						{#if links?.url}
							<a href={links.url} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
								<Icon icon="mage:external-link" width="16" height="16" />
								<span>URL</span>
							</a>
						{/if}
						{#if links?.doi}
							<a href={links.doi} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
								<Icon icon="mage:external-link" width="16" height="16" />
								<span>DOI</span>
							</a>
						{/if}
						{#if links?.pdf}
							<a href={links.pdf} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-xs md:text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
								<Icon icon="mage:file" width="16" height="16" />
								<span>PDF</span>
							</a>
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ol>
</section>
