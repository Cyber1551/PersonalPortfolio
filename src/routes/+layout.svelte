<script>
	import '../lib/styles/app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-900">
	<Header />
	<main class="relative flex min-h-0 flex-1 flex-col">
		<slot />
	</main>
	<Footer />
</div>
