<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DevlogPost } from '$lib/types';
	import { formatDate } from '$lib/helpers/dates';

	let { post, onSelectSeries }: { post: DevlogPost; onSelectSeries?: (name: string) => void } = $props();
</script>

<li
 class="group relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-blue-600/10 md:p-5"
>
	<!-- Clickable Overlay -->
	<a href={`/devlog/${post.slug}`} class="absolute inset-0 z-0 rounded-2xl" aria-label={post.title}></a>

	<div class="relative z-10 flex flex-col gap-3 pointer-events-none md:flex-row md:items-start md:justify-between">
		<div class="min-w-0 flex-1">
			<div class="flex items-center gap-2">
				<h3 class="text-base font-bold text-gray-900 transition-colors group-hover:text-blue-600 md:text-lg">
					{post.title}
				</h3>
			</div>
			<p class="mt-1 line-clamp-2 text-sm text-gray-600 md:text-base">{post.summary}</p>
			<div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pointer-events-auto">
				<time class="text-xs font-medium text-gray-400 md:text-sm" datetime={post.date}>
					{formatDate(post.date)}
				</time>

				{#if post.series}
					<button
						onclick={(e) => {
							e.preventDefault();
							if (post.series && onSelectSeries) onSelectSeries(post.series);
						}}
						class="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-blue-700/10 transition hover:bg-blue-600 hover:text-white"
					>
						<Icon icon="mage:hash" width="12" height="12" />
						{post.series}
						{#if post.part}
							<span class="ml-0.5 opacity-60">Part {post.part}</span>
						{/if}
					</button>
				{/if}
			</div>
		</div>

		<!-- Tags -->
		{#if post.tags?.length}
			<ul class="flex flex-wrap items-center gap-1.5 md:justify-end">
				{#each post.tags.slice(0, 4) as tag (tag)}
					<li
						class="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-gray-500 uppercase transition-colors group-hover:bg-gray-100 group-hover:text-gray-700"
					>
						{tag}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</li>
