<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>About | Brandon Lacy</title>
	<meta
		name="description"
		content="Learn about Brandon's journey from full-stack development to computer architecture."
	/>
</svelte:head>

<section class="flex w-full flex-col items-center px-4 py-10 text-center md:px-[10vw] md:py-14">
	<div class="w-full max-w-5xl space-y-10 md:space-y-14">
		<div>
			<h2 class="text-xl font-semibold text-gray-900 md:text-2xl">Who am I?</h2>
			{#each data.aboutParagraphs as paragraph (paragraph)}
				<p
					class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-balance text-gray-600 md:text-lg"
				>
					{paragraph}
				</p>
			{/each}
		</div>

		<div>
			{#each data.skillCategories as category (category.name)}
				<h3 class="text-lg font-semibold text-gray-900 md:text-xl">{category.name}</h3>
				<div
					class="mt-6 mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:mt-8 md:mb-12 md:grid-cols-5 md:gap-6 lg:grid-cols-6"
				>
					{#each category.skills as skill (skill.name)}
						<div
							class="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl bg-gray-100/80 p-2 shadow-sm ring-1 ring-black/5 transition hover:bg-white md:gap-3 md:p-6"
						>
							<Icon icon={skill.icon} width="28" height="28" class="md:hidden" />
							<Icon icon={skill.icon} width="40" height="40" class="hidden md:block" />
							<span class="text-[10px] leading-tight font-medium text-gray-700 md:text-base"
								>{skill.name}</span
							>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
