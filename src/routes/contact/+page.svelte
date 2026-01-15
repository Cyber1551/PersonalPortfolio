<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';

	let { data }: { data: PageData } = $props();
	const contactEmail = data.contactEmail;
	const githubLink = data.githubLink;
	const linkedinLink = data.linkedinLink;
	const resumeLink = data.resumeLink;
</script>

<svelte:head>
	<title>Contact | Brandon Lacy</title>
	<meta name="description" content="I’d love to hear from you." />
</svelte:head>

<section class="min-h-0 w-full flex-1 px-4 py-8 md:px-[10vw] md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">Contact</h1>
		<p class="mt-3 text-sm text-gray-600 md:text-base">I’d love to hear from you.</p>
	</div>

	<!-- Content md:grid-cols-[1.2fr_1fr] -->
	<div class="mt-6 grid gap-6 md:mt-10 md:gap-10">
		<!-- Sidebar: quick links -->
		<aside class="rounded-2xl bg-gray-50 p-4 ring-1 ring-black/5 md:p-6">
			<h2 class="text-base font-semibold text-gray-900 md:text-lg">Quick links</h2>
			<div class="mt-4 space-y-3">
				<!-- Direct email -->
				<div class="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-black/5">
					<div class="flex items-center gap-3">
						<Icon icon="mage:email" width="18" height="18" class="text-gray-700" />
						<a
							href={`mailto:${contactEmail}`}
							class="text-sm text-gray-800 hover:underline md:text-base">{contactEmail}</a
						>
					</div>
					<CopyButton text={contactEmail} />
				</div>

				<!-- Socials -->
				<div class="flex flex-col gap-2">
					<a
						href={githubLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-xl bg-white p-3 text-gray-800 ring-1 ring-black/5 hover:bg-gray-50"
					>
						<Icon icon="mage:github" width="18" height="18" />
						<span>GitHub</span>
					</a>
					<a
						href={linkedinLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-xl bg-white p-3 text-gray-800 ring-1 ring-black/5 hover:bg-gray-50"
					>
						<Icon icon="mage:linkedin" width="18" height="18" />
						<span>LinkedIn</span>
					</a>
					<a
						href={resumeLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-xl bg-white p-3 text-gray-800 ring-1 ring-black/5 hover:bg-gray-50"
					>
						<Icon icon="mage:download" width="18" height="18" />
						<span>Resume (PDF)</span>
					</a>
				</div>
			</div>
		</aside>
	</div>
</section>
