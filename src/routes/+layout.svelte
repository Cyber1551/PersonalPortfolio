<script>
	import '../lib/styles/app.css';
	import Header from '$lib/components/Header.svelte';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();
	let mainElement = $state();

	afterNavigate(() => {
		mainElement?.scrollTo(0, 0);
	});
</script>

<div class="flex h-dvh flex-col overflow-hidden bg-white text-gray-900">
	<Header />
	<main
		bind:this={mainElement}
		class="relative flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-gutter:stable]"
	>
		{@render children()}
	</main>
</div>
