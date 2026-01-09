<script>
	import { page } from '$app/state';
</script>

<div class="flex flex-col items-center justify-center py-20 text-center">
	<h1 class="text-6xl font-black text-gray-200">{page.status}</h1>
	<h2 class="mt-4 text-2xl font-bold text-gray-900">
		{page.error?.message || 'Something went wrong'}
	</h2>
	<a href="/" class="mt-8 text-blue-600 hover:underline">Return Home</a>
</div>