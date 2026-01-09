<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>About | Brandon Lacy</title>
	<meta name="description" content="Learn about Brandon's journey from full-stack development to computer architecture." />
</svelte:head>

<section class="flex flex-col items-center w-full px-4 md:px-[10vw] py-10 md:py-14 text-center">
	<div class="w-full max-w-5xl space-y-10 md:space-y-14">
		<div>
			<h2 class="text-xl md:text-2xl font-semibold text-gray-900">Who am I?</h2>
			{#each data.aboutParagraphs as paragraph (paragraph)}
				<p class="mx-auto mt-4 max-w-2xl text-balance text-gray-600 text-sm md:text-lg leading-relaxed">{paragraph}</p>
			{/each}
		</div>

		<div>
			{#each data.skillCategories as category (category.name)}
				<h3 class="text-lg md:text-xl font-semibold text-gray-900">{category.name}</h3>
				<div class="mt-6 md:mt-8 mb-8 md:mb-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-6">
					{#each category.skills as skill (skill.name)}
						<div class="flex flex-col items-center justify-center gap-1 md:gap-3 rounded-2xl bg-gray-100/80 p-2 md:p-6 aspect-square ring-1 ring-black/5 shadow-sm hover:bg-white transition">
							<Icon icon={skill.icon} width="28" height="28" class="md:hidden" />
							<Icon icon={skill.icon} width="40" height="40" class="hidden md:block" />
							<span class="text-[10px] md:text-base text-gray-700 font-medium leading-tight">{skill.name}</span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>