<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { menuItems } from '$lib/data/menu';
	import { githubLink, linkedinLink, resumeLink } from '$lib/data/links';

	let mobileOpen = false;
</script>

<header class="sticky top-0 z-50 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60">
	<div class="w-full px-4 pt-8 md:px-[10vw]">
		<div
			class="flex h-16 items-center justify-between gap-2 lg:grid lg:h-24 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4 xl:gap-8 2xl:gap-16"
		>
			<div class="flex justify-start lg:min-w-0">
				<a
					href="/"
					class="text-2xl font-semibold tracking-tight whitespace-nowrap text-gray-900 sm:text-3xl lg:text-lg xl:text-2xl 2xl:text-4xl"
					>Brandon Lacy</a
				>
			</div>

			<!-- Desktop nav -->
			<nav class="hidden lg:block lg:justify-self-center">
				<ul
					class="flex items-center gap-0 rounded-full bg-gray-100 px-1 py-1 text-[10px] text-gray-700 shadow-sm xl:gap-0.5 xl:px-2 xl:py-2 xl:text-xs 2xl:gap-2 2xl:text-base"
				>
					{#each menuItems as { label, href, icon } (href)}
						<li>
							<a
								{href}
								class="inline-flex h-8 items-center rounded-full px-1.5 whitespace-nowrap transition-colors hover:bg-white xl:h-10 xl:px-2.5"
								class:bg-white={page.url.pathname.startsWith(href)}
							>
								<Icon {icon} class="mr-1 h-3.5 w-3.5 xl:h-4 xl:w-4 2xl:h-7 2xl:w-7" />
								<span class="2xl:hidden">{label === 'Development Blog' ? 'Dev Blog' : label}</span>
								<span class="hidden 2xl:inline">{label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Right buttons -->
			<div class="flex items-center justify-end gap-2 lg:min-w-0 xl:gap-3 2xl:gap-6">
				{#each [{ link: resumeLink, icon: 'mage:download', label: 'Resume' }, { link: githubLink, icon: 'mage:github', label: 'GitHub' }, { link: linkedinLink, icon: 'mage:linkedin', label: 'LinkedIn' }] as item (item.label)}
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-gray-50 xl:h-10 xl:w-10 2xl:h-14 2xl:w-14"
					>
						<Icon icon={item.icon} class="h-4 w-4 xl:h-6 xl:w-6 2xl:h-10 2xl:w-10" />
						<span class="sr-only">{item.label}</span>
					</a>
				{/each}

				<button
					class="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-gray-700 hover:bg-gray-50 lg:hidden"
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav"
					onclick={() => (mobileOpen = !mobileOpen)}
				>
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
		<div
			id="mobile-nav"
			class="border-t bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 lg:hidden"
		>
			<div class="w-full px-4 md:px-[10vw]">
				<ul class="flex flex-col items-center gap-1 py-3 text-sm">
					{#each menuItems as { label, href, icon } (href)}
						<li>
							<a
								{href}
								class="inline-flex h-12 items-center rounded-full px-5 transition-colors hover:bg-white"
								class:bg-gray-100={page.url.pathname === href}
								onclick={() => (mobileOpen = false)}
							>
								<Icon {icon} width="24" height="24" class="pr-2" />{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</header>
