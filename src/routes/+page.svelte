<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Brandon Lacy | Developer</title>
	<meta
		name="description"
		content="Software engineer with 6+ years of experience building scalable systems, now exploring computer architecture and hardware-software integration."
	/>
</svelte:head>

<section
	class="grid min-h-0 w-full flex-1 place-content-center px-4 py-6 text-center md:px-[10vw] md:py-8"
>
	<h1 class="text-6xl font-black tracking-tight text-gray-900 md:text-8xl">
		Hey, I'm Brandon Lacy
	</h1>
	<p class="mt-6 text-2xl text-gray-700 md:text-3xl">{data.jobTitle} | {data.yearsOfExperience}</p>
	<i class="mx-auto mt-6 max-w-2xl text-base text-balance text-gray-600 md:text-xl"
		>{data.heroText}</i
	>

	<div class="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
		<a
			href="/projects"
			class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm ring-1 ring-blue-700/20 transition ring-inset hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:gap-3 md:px-8 md:py-4 md:text-lg"
		>
			<Icon icon="mage:box-3d" width="20" height="20" class="md:hidden" />
			<Icon icon="mage:box-3d" width="24" height="24" class="hidden md:block" />
			<span>View Projects</span>
		</a>
		<a
			href={data.resumeLink}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 md:gap-3 md:px-8 md:py-4 md:text-lg"
		>
			<Icon icon="mage:download" width="20" height="20" class="md:hidden" />
			<Icon icon="mage:download" width="24" height="24" class="hidden md:block" />
			<span>Download Resume</span>
		</a>
	</div>
</section>
