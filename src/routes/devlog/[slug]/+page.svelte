<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { formatDate } from '$lib/helpers/dates';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const seriesNav = $derived(data.seriesNav);
</script>

<svelte:head>
	<title>{post.title} | Development Logs | Brandon Lacy</title>
	<meta name="description" content={post.summary} />
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<nav class="mb-6">
		<a
			href="/devlog"
			class="inline-flex items-center gap-2 text-sm text-gray-700 transition-colors hover:text-gray-900 md:text-base"
		>
			<Icon icon="mage:chevron-left" width="18" height="18" />
			<span>Back to Dev Logs</span>
		</a>
	</nav>

	<header class="mb-10">
		{#if post.series}
			<div class="mb-3 flex items-center gap-2">
				<span
					class="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-blue-700/10"
				>
					<Icon icon="mage:hash" width="12" height="12" />
					{post.series}
					{#if post.part}
						<span class="ml-0.5 opacity-60">Part {post.part}</span>
					{/if}
				</span>
			</div>
		{/if}

		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">{post.title}</h1>

		<div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 md:text-base">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if post.tags?.length}
				<span class="text-gray-300">•</span>
				<ul class="flex flex-wrap items-center gap-2">
					{#each post.tags as tag (tag)}
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

	<div class="grid gap-12 lg:grid-cols-[1fr_250px] pb-10">
		<!-- Main Content -->
		<div class="min-w-0">
			<article class="prose prose-zinc max-w-none prose-h2:text-2xl prose-h2:font-black prose-h3:text-xl md:prose-lg">
				{#if data.content}
					{@const Content = data.content}
					<Content />
				{:else}
					<div class="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
						<Icon icon="mage:edit-pen" width="48" height="48" class="mx-auto text-gray-300" />
						<p class="mt-4 font-medium text-gray-500">Detailed write-up is in progress.</p>
					</div>
				{/if}
			</article>

			<!-- Series Navigation Footer -->
			{#if seriesNav && (seriesNav.prev || seriesNav.next)}
				<div class="mt-16 grid gap-4 border-t border-gray-100 pt-8 sm:grid-cols-2">
					{#if seriesNav.prev}
						<a
							href={`/devlog/${seriesNav.prev.slug}`}
							class="flex flex-col items-start rounded-2xl bg-gray-50 p-4 transition hover:bg-gray-100"
						>
							<span class="text-xs font-bold text-gray-400 uppercase tracking-widest"
								>Previous Part</span
							>
							<span class="mt-1 font-bold text-gray-900">{seriesNav.prev.title}</span>
						</a>
					{:else}
						<div></div>
					{/if}

					{#if seriesNav.next}
						<a
							href={`/devlog/${seriesNav.next.slug}`}
							class="flex flex-col items-end rounded-2xl bg-gray-50 p-4 text-right transition hover:bg-gray-100"
						>
							<span class="text-xs font-bold text-gray-400 uppercase tracking-widest"
								>Next Part</span
							>
							<span class="mt-1 font-bold text-gray-900">{seriesNav.next.title}</span>
						</a>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Sidebar -->
		<aside class="hidden lg:block">
			{#if seriesNav}
				<div class="sticky top-24 rounded-2xl bg-gray-50 p-6 ring-1 ring-black/5">
					<h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">Series</h3>
					<p class="mt-1 font-bold text-gray-900">{post.series}</p>

					<div class="mt-6 flex items-center gap-2">
						<div class="h-2 flex-1 rounded-full bg-gray-200">
							<div
								class="h-full rounded-full bg-blue-600 transition-all"
								style={`width: ${(seriesNav.current / seriesNav.total) * 100}%`}
							></div>
						</div>
						<span class="text-xs font-bold text-gray-500">
							{seriesNav.current} / {seriesNav.total}
						</span>
					</div>

					<nav class="mt-8 space-y-4">
						{#each data.seriesPosts as sPost (sPost.slug)}
							<a
								href={`/devlog/${sPost.slug}`}
								class="group flex items-start gap-3 text-sm"
							>
								<div
									class={`mt-1 h-2 w-2 shrink-0 rounded-full transition-colors ${
										sPost.slug === post.slug
											? 'bg-blue-600'
											: 'bg-gray-300 group-hover:bg-gray-400'
									}`}
								></div>
								<span
									class={`font-medium transition-colors ${
										sPost.slug === post.slug
											? 'text-gray-900 font-bold'
											: 'text-gray-500 group-hover:text-gray-700'
									}`}
								>
									{sPost.title.split(': ').pop()}
								</span>
							</a>
						{/each}
					</nav>
				</div>
			{/if}
		</aside>
	</div>
</section>