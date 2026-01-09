<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { menuItems } from '$lib/data/menu';
	import { githubLink, linkedinLink, resumeLink } from '$lib/data/links';

	let mobileOpen = false;
</script>

<header class="sticky top-0 z-50 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60">
	<div class="w-full px-4 md:px-[10vw] pt-8">
		<div class="flex h-16 lg:grid lg:h-24 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-between gap-2 lg:gap-4 xl:gap-8 2xl:gap-16">
			<div class="flex justify-start lg:min-w-0">
				<a href="/" class="font-semibold tracking-tight whitespace-nowrap text-2xl sm:text-3xl lg:text-lg xl:text-2xl 2xl:text-4xl text-gray-900">Brandon Lacy</a>
			</div>

			<!-- Desktop nav -->
			<nav class="hidden lg:block lg:justify-self-center">
				<ul class="flex items-center gap-0 xl:gap-0.5 2xl:gap-2 rounded-full bg-gray-100 px-1 xl:px-2 py-1 xl:py-2 text-[10px] xl:text-xs 2xl:text-base text-gray-700 shadow-sm">
					{#each menuItems as { label, href, icon } (href)}
						<li>
							<a href={href} class="inline-flex h-8 xl:h-10 items-center whitespace-nowrap rounded-full px-1.5 xl:px-2.5 hover:bg-white" style={`${page.url.pathname.startsWith(href) && 'background-color: white'}`}>
								<Icon icon={icon} class="mr-1 h-3.5 w-3.5 xl:h-4 xl:w-4 2xl:h-7 2xl:w-7" />
								<span class="2xl:hidden">{label === 'Development Blog' ? 'Dev Blog' : label}</span>
								<span class="hidden 2xl:inline">{label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Right buttons -->
			<div class="flex items-center justify-end gap-2 lg:min-w-0 xl:gap-3 2xl:gap-6">
				{#each [{link: resumeLink, icon: 'mage:download', label: 'Resume'}, {link: githubLink, icon: 'mage:github', label: 'GitHub'}, {link: linkedinLink, icon: 'mage:linkedin', label: 'LinkedIn'}] as item}
					<a href={item.link} target="_blank" rel="noreferrer" class="inline-flex h-8 w-8 xl:h-10 xl:w-10 2xl:h-14 2xl:w-14 items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-50 transition-colors">
						<Icon icon={item.icon} class="h-4 w-4 xl:h-6 xl:w-6 2xl:h-10 2xl:w-10" />
						<span class="sr-only">{item.label}</span>
					</a>
				{/each}

				<button class="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-gray-700 hover:bg-gray-50 lg:hidden" aria-expanded={mobileOpen} aria-controls="mobile-nav" onclick={() => (mobileOpen = !mobileOpen)}>
					{#if mobileOpen}
						<Icon icon="mdi:close" width="24" height="24" class="text-gray-700" />
					{:else}
						<Icon icon="mdi:menu" width="24" height="24" class="text-gray-700" />
					{/if}
					<span class="sr-only">Toggle navigation</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile nav -->
	{#if mobileOpen}
		<div id="mobile-nav" class="lg:hidden border-t bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
			<div class="w-full px-4 md:px-[10vw]">
				<ul class="flex flex-col gap-1 py-3 text-sm items-center">
					{#each menuItems as { label, href, icon } (href)}
						<li><a href={href} class="inline-flex h-12 items-center rounded-full px-5 hover:bg-white" onclick={() => (mobileOpen = false)} style={`${page.url.pathname === href && 'background-color: #f3f4f6'}`}>
							<Icon icon={icon} width="24" height="24" class="pr-2" />{label}
						</a></li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</header>
