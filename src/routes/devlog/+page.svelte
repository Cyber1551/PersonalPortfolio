<script lang="ts">
	import type { PageData } from './$types';
	import type { DevlogPost } from '$lib/types';
	import { formatDate } from '$lib/helpers/dates';

	let { data }: { data: PageData } = $props();

	// newest first
	const posts: DevlogPost[] = $derived(
		[...data.devPosts].sort((a, b) => b.date.localeCompare(a.date))
	);
</script>

<svelte:head>
	<title>Development Blog | Brandon Lacy</title>
	<meta
		name="description"
		content="Notes and work-in-progress updates across hardware, software, and research."
	/>
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">Development Blog</h1>
		<p class="mt-2 text-sm text-gray-600 md:mt-3 md:text-base">
			Build logs, experiments, and notes.
		</p>
	</div>

	<!-- List -->
	<ol class="mt-6 space-y-5 md:mt-8 md:space-y-6">
		{#each posts as post (post.slug)}
			<li
				class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md md:p-5"
			>
				<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
					<div class="min-w-0">
						<a
							href={`/devlog/${post.slug}`}
							class="rounded text-base font-semibold text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:text-lg"
						>
							{post.title}
						</a>
						<p class="mt-1 line-clamp-2 text-sm text-gray-700 md:text-base">{post.summary}</p>
						<p class="mt-1 text-xs text-gray-500 md:text-sm">{formatDate(post.date)}</p>
					</div>

					<!-- Tags -->
					{#if post.tags?.length}
						<ul class="flex flex-wrap items-center gap-2">
							{#each post.tags.slice(0, 6) as tag (tag)}
								<li
									class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ring-1 ring-black/5 md:text-sm"
								>
									{tag}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</section>
