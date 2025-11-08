<script lang="ts">
	import Icon from '@iconify/svelte';
	import { aboutParagraphs, techSkills } from '$lib/data/about';
</script>

<svelte:head>
	<title>About | Brandon Lacy</title>
	<meta name="description" content="Learn about Brandon's journey from full-stack development to computer architecture." />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] grid flex-1 min-h-0 place-content-center py-10 md:py-14 text-center">
	<div class="space-y-10 md:space-y-14">
		<div>
			<h2 class="text-xl md:text-2xl font-semibold text-gray-900">Who am I?</h2>
			{#each aboutParagraphs as paragraph (paragraph)}
				<p class="mx-auto mt-4 max-w-[42rem] text-balance text-gray-600 text-sm md:text-lg leading-relaxed">{paragraph}</p>
			{/each}
		</div>

		<div>
			<h3 class="text-lg md:text-xl font-semibold text-gray-900">Tools & Technologies</h3>
			<div class="mt-6 md:mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
				{#each techSkills as t (t.name)}
					<div class="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-100/80 px-6 py-6 h-[145px] w-[145px] ring-1 ring-black/5 shadow-sm hover:bg-white transition">
						<Icon icon={t.icon} width="32" height="32" class="md:hidden" />
						<Icon icon={t.icon} width="40" height="40" class="hidden md:block" />
						<span class="text-sm md:text-base text-gray-700">{t.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>