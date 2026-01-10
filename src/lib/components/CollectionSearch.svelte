<script lang="ts">
	import Icon from '@iconify/svelte';
	let {
		value = $bindable(),
		placeholder = 'Search...',
		label = 'Search',
		focusClass = 'focus:border-blue-500 focus:ring-blue-500/10'
	} = $props();
</script>

<label class="relative flex-1">
	<span class="sr-only">{label}</span>
	<Icon
		icon="mage:search"
		width="20"
		height="20"
		class="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400"
	/>
	<input
		type="search"
		bind:value
		{placeholder}
		class="w-full rounded-2xl border-gray-200 bg-white py-3 pr-4 pl-11 text-sm shadow-sm transition-all outline-none focus:ring-4 md:text-base {focusClass}"
	/>
</label>
