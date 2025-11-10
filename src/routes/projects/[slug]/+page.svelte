<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { getProjectBySlug } from '$lib/data/projects';

	const slug = $derived(page.params.slug ?? '');
	const project = $derived(getProjectBySlug(slug));
</script>

<svelte:head>
	<title>{project ? `${project.title} | Projects | Brandon Lacy` : 'Project | Brandon Lacy'}</title>
	<meta name="description" content={project ? project.summary : 'Project details'} />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
	<a href="/projects" class="justify-self-start inline-flex items-center gap-2 text-sm md:text-base text-gray-700 hover:text-gray-900">
		<Icon icon="mage:chevron-left" width="18" height="18" />
		<span>Back to Projects</span>
	</a>

	{#if project}
		<header class="mt-4 md:mt-6">
			<h1 class="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">{project.title}</h1>
			<div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
				{#if project.year}
					<span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700 ring-1 ring-black/5">{project.year}</span>
				{/if}
				{#each project.tags as tag}
					<span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700 ring-1 ring-black/5">{tag}</span>
				{/each}
			</div>

			<!-- Actions -->
			<div class="mt-4 flex flex-wrap items-center gap-3">
				{#if project.links?.demo}
					<a href={project.links.demo} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm md:text-base font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
						<Icon icon="mage:external-link" width="18" height="18" />
						<span>Live Demo</span>
					</a>
				{/if}
				{#if project.links?.github}
					<a href={project.links.github} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm md:text-base font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
						<Icon icon="mage:github" width="18" height="18" />
						<span>GitHub</span>
					</a>
				{/if}
			</div>
		</header>

		<div class="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
			<!-- Overview -->
			<article class="prose prose-zinc max-w-none md:prose-lg">
				<h2>Overview</h2>
				<p>{project.summary}</p>
				<p class="text-gray-500">More details coming soon. This page is a scaffold ready for screenshots, architecture diagrams, and writeups.</p>
			</article>

			<!-- Tech stack -->
			<aside class="rounded-2xl bg-gray-50 p-4 md:p-6 ring-1 ring-black/5">
				<h3 class="text-base md:text-lg font-semibold text-gray-900">Tech</h3>
				<ul class="mt-3 flex flex-wrap gap-2">
					{#each project.tech as t (t.name)}
						<li class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-gray-700 ring-1 ring-black/5">
							<Icon icon={t.icon} width="18" height="18" class="text-gray-600" />
							<span>{t.name}</span>
						</li>
					{/each}
				</ul>
			</aside>
		</div>
	{:else}
		<p class="mt-10 text-center text-gray-500">Project not found. <a href="/projects" class="text-blue-600 hover:underline">Back to list</a></p>
	{/if}
</section>
