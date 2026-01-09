<script lang="ts">
	type CollectionFilterProps = {
		label: string;
		items: string[];
		selected: Set<string>;
		onToggle: (item: string) => void;
		activeClass?: string;
	}

	let {
		label,
		items,
		selected,
		onToggle,
		activeClass = 'bg-blue-600 text-white shadow-blue-500/20'
	}: CollectionFilterProps = $props();
</script>

<div class="flex flex-col gap-3 md:flex-row md:items-center">
	<span class="min-w-[60px] text-xs font-bold uppercase tracking-widest text-gray-400">{label}</span>
	<div class="flex flex-wrap gap-2">
		{#each items as item}
			<button
				type="button"
				onclick={() => onToggle(item)}
				class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shadow-sm {selected.has(item)
					? `${activeClass} text-white shadow-md`
					: 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'}"
			>
				{item}
			</button>
		{/each}
	</div>
</div>