<script lang="ts">
	import Icon from '@iconify/svelte';
	let {
		value = $bindable(),
		placeholder = "Search...",
		label = "Search",
		focusClass = "focus:border-blue-500 focus:ring-blue-500/10"
	} = $props();
</script>

<label class="relative flex-1">
	<span class="sr-only">{label}</span>
	<Icon icon="mage:search" width="20" height="20" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
	<input
		type="search"
		bind:value
		{placeholder}
		class="w-full rounded-2xl border-gray-200 bg-white pl-11 pr-4 py-3 text-sm md:text-base shadow-sm outline-none transition-all focus:ring-4 {focusClass}"
	/>
</label>