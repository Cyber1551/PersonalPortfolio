<script lang="ts">
	import Icon from '@iconify/svelte'
	import type { Project } from '$lib/types';
	import { projectLinksConfig } from '$lib/data/projects';
	const { project }: { project: Project } = $props();

	const hasLinks = $derived(project.links?.length > 0);
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
				class="project-image h-full w-full transition-all duration-700"
				style="object-fit: {mainImage.offset?.fit ?? 'cover'}; object-position: {mainImage.offset?.x ?? 50}% {mainImage.offset?.y ?? 50}%; --zoom: {mainImage.offset?.zoom ?? 1};"
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

		{#if project.forked}
			<div class="absolute top-0 left-0 z-10 h-20 w-20 overflow-hidden">
				<div
					class="absolute top-5 -left-8 w-28 -rotate-45 bg-indigo-600 py-1 text-center text-[10px] font-black text-white shadow-indigo-500/50 shadow-lg ring-1 ring-white/20"
					title="Contribution to a fork"
				>
					<div class="flex items-center justify-center gap-1 uppercase tracking-wider">
						<Icon icon="mage:git-fork" width="12" height="12" />
						<span>Forked</span>
					</div>
				</div>
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
				{#each project.links as link (link.url)}
					{@const config = projectLinksConfig[link.type]}
					{@const isInternal = ['devlog', 'publication'].includes(link.type)}
					<a
						href={link.url}
						target={!isInternal ? '_blank' : undefined}
						rel={!isInternal ? 'noopener noreferrer' : undefined}
						class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none {config.baseClass}"
					>
						<Icon icon={config.icon} width="14" height="14" />
						<span>{link.label || config.label}</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</article>

<style>
	.project-image {
		transform: scale(var(--zoom, 1));
	}

	.group:hover .project-image {
		transform: scale(calc(var(--zoom, 1) * 1.03));
	}
</style>
