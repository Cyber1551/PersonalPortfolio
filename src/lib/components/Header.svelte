<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { menuItems } from '$lib/data/menu';
	import { githubLink, linkedinLink } from '$lib/data/links';

	let mobileOpen = false;
</script>

<header class="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
	<div class="w-full px-4 md:px-[10vw] pt-8">
		<div class="flex h-16 md:h-24 items-center justify-between gap-3 md:gap-6 md:grid md:grid-cols-[1fr_auto_1fr]">
			<a href="/" class="font-semibold tracking-tight text-3xl md:text-5xl text-gray-900 md:justify-self-start">Brandon Lacy</a>

			<!-- Desktop nav -->
			<nav class="hidden md:block md:justify-self-center">
				<ul class="flex items-center gap-1 md:gap-2 rounded-full bg-gray-100 px-2 md:px-3 py-1 md:py-2 text-sm md:text-lg text-gray-700 shadow-sm">
					{#each menuItems as { label, href, icon } (href)}
						<li><a href={href} class="inline-flex h-9 md:h-14 items-center rounded-full px-3 md:px-5 hover:bg-white" style={`${page.url.pathname === href && 'background-color: white'}`}>
							<Icon icon={icon} width="32" height="32" class="pr-2" />{label}
						</a></li>
					{/each}
				</ul>
			</nav>

			<!-- Right buttons -->
			<div class="flex items-center gap-4 md:gap-6 md:justify-self-end">
				<a href="/" target="_blank" rel="noreferrer" class="inline-flex h-9 w-9 md:h-14 md:w-14 items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-50">
					<Icon icon="mage:download" width="28" height="28" class="text-gray-700 md:hidden" />
					<Icon icon="mage:download" width="42" height="42" class="text-gray-700 hidden md:block" />
					<span class="sr-only">Resume</span>
				</a>
				<a href={githubLink} target="_blank" rel="noreferrer" class="inline-flex h-9 w-9 md:h-14 md:w-14 items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-50">
					<Icon icon="mage:github" width="28" height="28" class="text-gray-700 md:hidden" />
					<Icon icon="mage:github" width="42" height="42" class="text-gray-700 hidden md:block" />
					<span class="sr-only">GitHub</span>
				</a>
				<a href={linkedinLink} target="_blank" rel="noreferrer" class="inline-flex h-9 w-9 md:h-14 md:w-14 items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-50">
					<Icon icon="mage:linkedin" width="28" height="28" class="text-gray-700 md:hidden" />
					<Icon icon="mage:linkedin" width="42" height="42" class="text-gray-700 hidden md:block" />
					<span class="sr-only">LinkedIn</span>
				</a>
				<button class="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-gray-700 hover:bg-gray-50 md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-nav" on:click={() => (mobileOpen = !mobileOpen)}>
					{#if mobileOpen}
						<Icon icon="mdi:close" width="28" height="28" class="text-gray-700" />
					{:else}
						<Icon icon="mdi:menu" width="28" height="28" class="text-gray-700" />
					{/if}
					<span class="sr-only">Toggle navigation</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile nav -->
	{#if mobileOpen}
		<div id="mobile-nav" class="md:hidden border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div class="w-full px-4 md:px-[10vw]">
				<ul class="flex flex-col gap-1 py-3 text-sm items-center">
					{#each menuItems as { label, href, icon } (href)}
						<li><a href={href} class="inline-flex h-9 md:h-14 items-center rounded-full px-3 md:px-5 hover:bg-white" on:click={() => (mobileOpen = false)} style={`${page.url.pathname === href && 'background-color: #f3f4f6'}`}>
							<Icon icon={icon} width="32" height="32" class="pr-2" />{label}
						</a></li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</header>
