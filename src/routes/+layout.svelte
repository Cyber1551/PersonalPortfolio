<script>
	import '../lib/styles/app.css';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<div class="flex h-dvh flex-col overflow-hidden bg-white text-gray-900">
	<Header />
	<main class="relative flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-gutter:stable]">
		{@render children()}
	</main>
</div>
