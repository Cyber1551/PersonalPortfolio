<script lang="ts">
	import Icon from '@iconify/svelte';
	import { heroText, jobTitle, yearsOfExperience } from '$lib/data/about';
</script>

<svelte:head>
	<title>Brandon Lacy | Developer</title>
	<meta name="description" content="Software engineer with 6+ years of experience building scalable systems, now exploring computer architecture and hardware-software integration." />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] grid flex-1 min-h-0 place-content-center py-6 md:py-8 text-center">
	<h1 class="text-6xl font-black tracking-tight text-gray-900 md:text-8xl">Hi, I'm Brandon Lacy</h1>
	<p class="mt-6 text-2xl text-gray-700 md:text-3xl">{jobTitle} | {yearsOfExperience}</p>
	<p class="mx-auto mt-6 max-w-2xl text-balance text-gray-600 text-base md:text-xl">{heroText}</p>

	<div class="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
		<a href="/projects" class="inline-flex items-center gap-2 md:gap-3 rounded-full bg-blue-600 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
			<Icon icon="mage:box-3d" width="20" height="20" class="md:hidden" />
			<Icon icon="mage:box-3d" width="24" height="24" class="hidden md:block" />
			<span>View Projects</span>
		</a>
		<a href="/resume.pdf" class="inline-flex items-center gap-2 md:gap-3 rounded-full border px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
			<Icon icon="mage:download" width="20" height="20" class="md:hidden" />
			<Icon icon="mage:download" width="24" height="24" class="hidden md:block" />
			<span>Download Resume</span>
		</a>
	</div>
</section>