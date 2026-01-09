<script>
import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col items-center justify-center py-20 text-center">
	<div class="rounded-full bg-red-50 p-6 text-red-500">
		<Icon icon="mingcute:question-line" width="64" height="64" />
	</div>
	<h2 class="mt-6 text-2xl font-bold text-gray-900">Publications not found</h2>
	<p class="mt-2 text-gray-600">The publication you are looking for doesn't exist or has been moved.</p>
	<a
		href="/projects"
		class="mt-8 rounded-full bg-gray-900 px-8 py-3 font-bold text-white transition hover:bg-gray-800"
	>
		Return to Publications
	</a>
</div>