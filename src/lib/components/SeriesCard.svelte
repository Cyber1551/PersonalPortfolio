<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { SeriesData } from '$lib/loaders/devlog';

	let { series, onSelect }: { series: SeriesData; onSelect: (name: string) => void } = $props();
</script>

<div
	class="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-blue-600/10"
>
	<!-- Clickable Overlay -->
	<button
		onclick={() => onSelect(series.name)}
		class="absolute inset-0 z-0 cursor-pointer rounded-2xl"
		aria-label={`View series: ${series.name}`}
	></button>

	<div class="relative z-10 flex flex-1 flex-col pointer-events-none">
		<div class="mb-4 flex items-start justify-between">
			<div
				class="rounded-xl bg-blue-50 p-3 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white"
			>
				<Icon icon="mage:folder-2" width="24" height="24" />
			</div>
			<span class="text-xs font-bold text-gray-400 uppercase tracking-widest">
				{series.posts.length} {series.posts.length === 1 ? 'post' : 'posts'}
			</span>
		</div>

		<h2
			class="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors md:text-2xl"
		>
			{series.name}
		</h2>

		<p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600 md:text-base">
			{series.summary}
		</p>

		<div class="mt-6 space-y-2 pointer-events-auto">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400"
					>Latest Logs</span
				>
				<div class="h-px flex-1 bg-gray-100"></div>
			</div>

			{#each series.posts.slice(0, 3) as post (post.slug)}
				<a
					href={`/devlog/${post.slug}`}
					class="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700 ring-1 ring-inset ring-transparent hover:ring-blue-100"
				>
					<span class="truncate">
						{#if post.part}
							<span class="mr-2 text-[10px] font-black text-gray-400 uppercase"
								>Part {post.part}</span
							>
						{/if}
						{post.title.split(': ').pop()}
					</span>
					<Icon icon="mage:chevron-right" width="16" height="16" class="text-gray-400" />
				</a>
			{/each}

			{#if series.posts.length > 3}
				<button
					onclick={() => onSelect(series.name)}
					class="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-100 py-3 text-xs font-bold text-gray-400 transition hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600"
				>
					<span>+ {series.posts.length - 3} more posts</span>
					<Icon icon="mage:chevron-down" width="14" height="14" />
				</button>
			{/if}
		</div>
	</div>
</div>
