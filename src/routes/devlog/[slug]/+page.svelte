<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { formatDate } from '$lib/helpers/dates';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title
		>{post
			? `${post.title} | Development Blog | Brandon Lacy`
			: 'Development Blog | Brandon Lacy'}</title
	>
	<meta name="description" content={post ? post.summary : 'Development blog post'} />
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<a
		href="/devlog"
		class="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 md:text-base"
	>
		<Icon icon="mage:chevron-left" width="18" height="18" />
		<span>Back to Dev Blog</span>
	</a>

	{#if post}
		<header class="mt-4 md:mt-6">
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">{post.title}</h1>
			<div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600 md:text-base">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				{#if post.tags?.length}
					<span aria-hidden="true">·</span>
					<ul class="flex flex-wrap items-center gap-2">
						{#each post.tags as tag (tag)}
							<li
								class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700 ring-1 ring-black/5"
							>
								{tag}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</header>

		<article class="prose mt-6 max-w-none prose-zinc md:prose-lg">
			{#if post.content?.length}
				{#each post.content as para (para)}
					<p>{para}</p>
				{/each}
			{:else}
				<p class="text-gray-500">Write-up coming soon.</p>
			{/if}
		</article>
	{:else}
		<p class="mt-10 text-center text-gray-500">
			Post not found. <a href="/devlog" class="text-blue-600 hover:underline">Back to list</a>
		</p>
	{/if}
</section>
