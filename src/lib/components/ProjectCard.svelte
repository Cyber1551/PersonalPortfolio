<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Project } from '$lib/types';
	const { project }: { project: Project} = $props();
</script>

<article class="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm transition hover:shadow-md">
	<!-- Image / placeholder -->
	<div class="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
		{#if project.image}
			<img src={project.image} alt="" class="h-full w-full object-cover" loading="lazy" />
		{:else}
			<!-- subtle placeholder pattern -->
			<div class="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,theme(colors.blue.200/50)_1px,transparent_0)] [background-size:20px_20px]"></div>
		{/if}
		<div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5"></div>
	</div>

	<!-- Body -->
	<div class="flex flex-1 flex-col gap-3 p-4 md:p-5">
		<header class="space-y-1">
			<h3 class="text-base md:text-lg font-semibold text-gray-900">{project.title}</h3>
			{#if project.year}
				<p class="text-xs md:text-sm text-gray-500">{project.year}</p>
			{/if}
		</header>
		<p class="text-sm md:text-base text-gray-700 line-clamp-3">{project.summary}</p>

		<!-- Tech badges -->
		{#if project.tech?.length}
			<ul class="mt-1 flex flex-wrap gap-2">
				{#each project.tech.slice(0, 5) as t (t.name)}
					<li class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs md:text-sm text-gray-700 ring-1 ring-black/5">
						<Icon icon={t.icon} width="16" height="16" class="text-gray-600" />
						<span>{t.name}</span>
					</li>
				{/each}
			</ul>
		{/if}

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Actions -->
		<div class="flex items-center gap-2">
			{#if project.links?.demo}
				<a href={project.links.demo} target="_blank" rel="noreferrer"
					class="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-xs md:text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
					<Icon icon="mage:external-link" width="16" height="16" />
					<span>Live Demo</span>
				</a>
			{/if}
			{#if project.links?.github}
				<a href={project.links.github} target="_blank" rel="noreferrer"
					class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
					<Icon icon="mage:github" width="16" height="16" />
					<span>GitHub</span>
				</a>
			{/if}
		</div>
	</div>

	<!-- hover ring -->
	<div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-black/10"></div>
</article>
