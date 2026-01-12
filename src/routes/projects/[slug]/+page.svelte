<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { projectLinksConfig } from '$lib/data/projects';
	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);

	let activeImageIndex = $state(0);
	const images = $derived(project?.images ?? []);

	function nextImage() {
		activeImageIndex = (activeImageIndex + 1) % images.length;
	}

	function prevImage() {
		activeImageIndex = (activeImageIndex - 1 + images.length) % images.length;
	}
</script>

<svelte:head>
	<title>{project ? `${project.title} | Projects | Brandon Lacy` : 'Project | Brandon Lacy'}</title>
	<meta name="description" content={project ? project.summary : 'Project details'} />
</svelte:head>

<section class="flex h-full flex-1 flex-col overflow-hidden px-4 py-4 md:px-[10vw] md:py-6">
	<!-- Navigation -->
	<nav class="mb-4 shrink-0">
		<a
			href="/projects"
			class="inline-flex items-center gap-2 text-sm text-gray-700 transition-colors hover:text-gray-900 md:text-base"
		>
			<Icon icon="mage:chevron-left" width="18" height="18" />
			<span>Back to Projects</span>
		</a>
	</nav>

	{#if project}
		<div class="grid min-h-0 flex-1 gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
			<!-- Left Column: Info and Overview -->
			<div class="flex min-h-0 flex-col">
				<header class="shrink-0">
					<div class="flex items-center gap-3">
						{#if project.year}
							<span
								class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase"
							>
								{project.year}
							</span>
						{/if}
						{#if project.forked}
							<span
								class="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm ring-1 ring-white/10"
								title="Contribution to a fork"
							>
								<Icon icon="mage:git-fork" width="12" height="12" />
								<span>Forked</span>
							</span>
						{/if}
						<h1 class="text-2xl font-black tracking-tight text-gray-900 md:text-4xl">
							{project.title}
						</h1>
					</div>

					{#if project.tags?.length}
						<div class="mt-3 flex flex-wrap gap-x-2 gap-y-1">
							{#each project.tags as tag, i (tag)}
								<span
									class="text-xs font-bold tracking-widest whitespace-nowrap text-gray-500 uppercase"
									>{tag}</span
								>
								{#if i < project.tags.length - 1}
									<span class="text-[10px] text-gray-300">•</span>
								{/if}
							{/each}
						</div>
					{/if}

					<p class="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
						{project.summary}
					</p>

					<div class="mt-6 flex flex-wrap items-center gap-2">
						{#each project.links as link (link.url)}
							{@const config = data.projectLinksConfig[link.type]}
							{@const isInternal = ['devlog', 'publication'].includes(link.type)}
							<a
								href={link.url}
								target={!isInternal ? '_blank' : undefined}
								rel={!isInternal ? 'noopener noreferrer' : undefined}
								class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition md:text-sm {config.baseClass}"
							>
								<Icon icon={config.icon} width="16" height="16" />
								<span>{link.label || config.label}</span>
							</a>
						{/each}
					</div>
				</header>

				<!-- Scrollable Overview -->
				<div class="mt-8 flex min-h-0 flex-1 flex-col">
					<h2 class="mb-4 shrink-0 text-lg font-bold tracking-widest text-gray-900 uppercase">
						Project Overview
					</h2>
					<div class="scrollbar-thin scrollbar-thumb-gray-200 mb-10 flex-1 overflow-y-auto pr-4">
						<article class="prose prose-sm max-w-none prose-zinc md:prose-base">
							{#if data.overviewHtml}
								{@html data.overviewHtml}
							{:else}
								<p class="text-gray-500 italic">
									Full technical case study, architecture diagrams, and development insights are
									being compiled. Check back soon for the complete write-up.
								</p>
							{/if}
							<div class="h-20"></div>
						</article>
					</div>
				</div>
			</div>

			<!-- Right Column: Carousel and Tech Stack -->
			<div class="flex min-h-0 flex-col gap-8">
				<!-- Carousel -->
				<div
					class="relative shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5"
				>
					<div class="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
						{#if project.forked}
							<div class="absolute top-0 left-0 z-10 h-24 w-24 overflow-hidden">
								<div
									class="absolute top-6 -left-10 w-36 -rotate-45 bg-indigo-600 py-1.5 text-center text-xs font-black text-white shadow-indigo-500/50 shadow-lg ring-1 ring-white/20"
									title="Contribution to a fork"
								>
									<div class="flex items-center justify-center gap-1.5 uppercase tracking-widest">
										<Icon icon="mage:git-fork" width="14" height="14" />
										<span>Forked</span>
									</div>
								</div>
							</div>
						{/if}
						{#if images.length > 0}
							{@const currentImage = images[activeImageIndex]}
							<img
								src={currentImage.path}
								alt={project.title}
								class="h-full w-full"
								style="object-fit: {currentImage.offset?.fit ?? 'cover'}; object-position: {currentImage.offset?.x ?? 50}% {currentImage.offset?.y ??
									50}%; transform: scale({currentImage.offset?.zoom ?? 1});"
							/>

							{#if images.length > 1}
								<button
									onclick={prevImage}
									class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
									aria-label="Previous image"
								>
									<Icon icon="mage:chevron-left" width="20" height="20" />
								</button>
								<button
									onclick={nextImage}
									class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
									aria-label="Next image"
								>
									<Icon icon="mage:chevron-right" width="20" height="20" />
								</button>
							{/if}
						{:else}
							<div
								class="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50"
							>
								<Icon icon="mage:box-3d" width="48" height="48" class="text-blue-200" />
							</div>
						{/if}
					</div>

					{#if images.length > 1}
						<!-- Carousel Controls Bar -->
						<div
							class="flex items-center justify-between border-t border-black/5 bg-gray-50/50 px-4 py-3 backdrop-blur-sm"
						>
							<div class="flex items-center gap-2">
								<span class="text-[10px] font-black tracking-widest text-gray-400 uppercase">
									Gallery
								</span>
								<span
									class="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-700"
								>
									{activeImageIndex + 1} / {images.length}
								</span>
							</div>

							<div class="flex gap-1.5">
								{#each images as image, i (image.path)}
									<button
										onclick={() => (activeImageIndex = i)}
										class="h-1.5 rounded-full transition-all {i === activeImageIndex
											? 'w-6 bg-blue-600'
											: 'w-1.5 bg-gray-300 hover:bg-gray-400'}"
										aria-label={`Go to image ${i + 1}`}
									></button>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Sidebar: Tech Stack -->
				<div
					class="mb-10 flex min-h-0 flex-1 flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-black/5"
				>
					<h3 class="mb-4 shrink-0 text-lg font-bold tracking-widest text-gray-900 uppercase">
						Tech Stack
					</h3>
					<div class="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto pr-2">
						<div class="grid grid-cols-4 gap-3">
							{#each project.tech as t (t.name)}
								<div
									class="flex items-center gap-2.5 rounded-xl border border-black/5 bg-white p-2.5 transition hover:shadow-sm"
								>
									<Icon icon={t.icon} width="20" height="20" class="shrink-0" />
									<span class="text-xs font-bold text-gray-700">{t.name}</span>
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
				<Icon icon="mage:box-3d-off" width="64" height="64" />
			</div>
			<h2 class="mt-6 text-2xl font-bold text-gray-900">Project not found</h2>
			<p class="mt-2 text-gray-600">
				The project you are looking for doesn't exist or has been moved.
			</p>
			<a
				href="/projects"
				class="mt-8 rounded-full bg-gray-900 px-8 py-3 font-bold text-white transition hover:bg-gray-800"
			>
				Return to Projects
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
