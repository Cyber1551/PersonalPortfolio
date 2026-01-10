<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Project } from '$lib/types';
	const { project }: { project: Project } = $props();

	const hasLinks = $derived(Object.values(project.links || {}).some((link) => link));
</script>

<article
	class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-500 focus-within:ring-2 focus-within:ring-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
>
	<!-- Image Section -->
	<div class="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
		{#if project.images?.length}
			{@const mainImage = project.images[0]}
			<img
				src={mainImage.path}
				alt={project.title}
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
				style="object-position: {mainImage.offset?.x ?? 50}% {mainImage.offset?.y ?? 50}%"
				loading="lazy"
			/>
		{:else}
			<div
				class="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50"
			>
				<Icon icon="mage:box-3d" width="48" height="48" class="text-blue-200" />
			</div>
		{/if}

		{#if project.year}
			<div class="absolute top-3 right-3 z-10">
				<span
					class="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white ring-1 ring-white/20 backdrop-blur-md"
				>
					{project.year}
				</span>
			</div>
		{/if}
	</div>

	<!-- Content Section -->
	<div class="flex flex-1 flex-col p-5">
		<div class="mb-3">
			<h3 class="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
				<a href={`/projects/${project.slug}`} class="focus:outline-none">
					<span class="absolute inset-0 z-0" aria-hidden="true"></span>
					{project.title}
				</a>
			</h3>

			{#if project.tags?.length}
				<div class="mt-1.5 flex flex-wrap gap-1.5">
					{#each project.tags as tag, i (tag)}
						<span class="text-[10px] font-bold tracking-wider text-blue-600/80 uppercase">
							{tag}
						</span>
						{#if i < project.tags.length - 1}
							<span class="text-[10px] text-gray-300">•</span>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<p class="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
			{project.summary}
		</p>

		<!-- Tech stack -->
		{#if project.tech?.length}
			<div class="mb-6 flex flex-wrap gap-2">
				{#each project.tech.slice(0, 5) as t (t.name)}
					<div
						class="inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-600 ring-1 ring-black/5"
						title={t.name}
					>
						<Icon icon={t.icon} width="14" height="14" class="shrink-0" />
						<span>{t.name}</span>
					</div>
				{/each}
				{#if project.tech.length > 5}
					<span class="text-xs font-medium text-gray-400">+{project.tech.length - 5}</span>
				{/if}
			</div>
		{/if}

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Actions -->
		{#if hasLinks}
			<div class="relative z-10 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
				{#if project.links?.demo}
					<a
						href={project.links.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						<Icon icon="mage:external-link" width="14" height="14" />
						<span>Demo</span>
					</a>
				{/if}
				{#if project.links?.github}
					<a
						href={project.links.github}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
					>
						<Icon icon="mage:github" width="14" height="14" />
						<span>Code</span>
					</a>
				{/if}
				{#if project.links?.youtube}
					<a
						href={project.links.youtube}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none"
					>
						<Icon icon="logos:youtube-icon" width="14" height="14" />
						<span>Video</span>
					</a>
				{/if}
				{#if project.links?.devlog}
					<a
						href={project.links.devlog}
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none"
					>
						<Icon icon="mage:hash" width="14" height="14" />
						<span>DevLog</span>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</article>
