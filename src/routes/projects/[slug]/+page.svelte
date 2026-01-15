<script lang="ts">
 import type { PageData } from './$types';
 import Icon from '@iconify/svelte';
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
	<title>{project.title} | Projects | Brandon Lacy</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Navigation -->
	<nav class="mb-6">
		<a
			href="/projects"
			class="inline-flex items-center gap-2 text-sm text-gray-700 transition-colors hover:text-gray-900 md:text-base"
		>
			<Icon icon="mage:chevron-left" width="18" height="18" />
			<span>Back to Projects</span>
		</a>
	</nav>

	<header class="mb-10">
		<div class="mb-3 flex items-center gap-2">
			{#if project.year}
				<span
					class="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-blue-700/10"
				>
					{project.year}
				</span>
			{/if}
			{#if project.forked}
				<span
					class="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm ring-1 ring-white/10"
					title="Contribution to a fork"
				>
					<Icon icon="mage:git-fork" width="12" height="12" />
					<span>Forked</span>
				</span>
			{/if}
		</div>

		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
			{project.title}
		</h1>

		{#if project.tags?.length}
			<div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 md:text-base">
				<ul class="flex flex-wrap items-center gap-2">
					{#each project.tags as tag (tag)}
						<li
							class="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600"
						>
							{tag}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</header>

	<div class="grid min-h-0 flex-1 gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
		<!-- Left Column: Info and Overview -->
		<div class="flex min-h-0 flex-col">
			<div class="shrink-0">
				<p class="text-sm leading-relaxed text-gray-600 md:text-base">
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
			</div>

			<!-- Scrollable Overview -->
			<div class="mt-8 flex min-h-0 flex-1 flex-col">
				<h2 class="mb-4 shrink-0 text-lg font-bold tracking-widest text-gray-900 uppercase">
					Project Overview
				</h2>
				<div class="scrollbar-thin scrollbar-thumb-gray-200 mb-10 flex-1 overflow-y-auto pr-4">
					<article class="prose prose-sm max-w-none prose-zinc md:prose-base">
						{#if data.content}
							{@const Content = data.content}
							<Content />
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
						{#if currentImage.path.endsWith('.mp4')}
							<video
								src={currentImage.path}
								autoplay
								muted
								loop
								playsinline
								class="h-full w-full"
								style="object-fit: {currentImage.offset?.fit ?? 'cover'}; object-position: {currentImage.offset?.x ?? 50}% {currentImage.offset?.y ??
									50}%; transform: scale({currentImage.offset?.zoom ?? 1});"
							></video>
						{:else}
							<img
								src={currentImage.path}
								alt={project.title}
								class="h-full w-full"
								style="object-fit: {currentImage.offset?.fit ?? 'cover'}; object-position: {currentImage.offset?.x ?? 50}% {currentImage.offset?.y ??
									50}%; transform: scale({currentImage.offset?.zoom ?? 1});"
							/>
						{/if}

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
