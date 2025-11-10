<script lang="ts">
	import Icon from '@iconify/svelte';
	import { contactEmail, githubLink, linkedinLink } from '$lib/data/links';
	import CopyButton from '$lib/components/CopyButton.svelte';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let notice: 'idle' | 'sent' | 'copied' | 'error' = $state('idle');

	function handleSubmit(event: SubmitEvent) {
		// Build a mailto link so it works without a backend
		event.preventDefault();
		const to = CONTACT_EMAIL;
		const s = encodeURIComponent(subject.trim() || 'Contact from portfolio');
		const body = [
			message.trim(),
			'',
			'—',
			`From: ${name || '(no name)'}`,
			`Email: ${email || '(not provided)'}`
		].join('\n');
		const b = encodeURIComponent(body);
		const href = `mailto:${to}?subject=${s}&body=${b}`;
		try {
			window.location.href = href;
			notice = 'sent';
			setTimeout(() => (notice = 'idle'), 2500);
		} catch (err) {
			notice = 'error';
		}
	}

</script>

<svelte:head>
	<title>Contact | Brandon Lacy</title>
	<meta name="description" content="I’d love to hear from you." />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
	<!-- Heading -->
	<div class="text-center">
		<h1 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Contact</h1>
		<p class="mt-3 text-gray-600 text-sm md:text-base">I’d love to hear from you.</p>
	</div>

	<!-- Content -->
	<div class="mt-6 md:mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
		<!-- Sidebar: quick links -->
		<aside class="rounded-2xl bg-gray-50 p-4 md:p-6 ring-1 ring-black/5">
			<h2 class="text-base md:text-lg font-semibold text-gray-900">Quick links</h2>
			<div class="mt-4 space-y-3">
				<!-- Direct email -->
				<div class="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-black/5">
					<div class="flex items-center gap-3">
						<Icon icon="mage:email" width="18" height="18" class="text-gray-700" />
						<a href={`mailto:${contactEmail}`} class="text-sm md:text-base text-gray-800 hover:underline">{contactEmail}</a>
					</div>
					<CopyButton text={contactEmail} />
				</div>

				<!-- Socials -->
				<div class="flex flex-col gap-2">
					<a href={githubLink} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-white p-3 text-gray-800 ring-1 ring-black/5 hover:bg-gray-50">
						<Icon icon="mage:github" width="18" height="18" />
						<span>GitHub</span>
					</a>
					<a href={linkedinLink} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-white p-3 text-gray-800 ring-1 ring-black/5 hover:bg-gray-50">
						<Icon icon="mage:linkedin" width="18" height="18" />
						<span>LinkedIn</span>
					</a>
					<a href="/resume.pdf" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-white p-3 text-gray-800 ring-1 ring-black/5 hover:bg-gray-50">
						<Icon icon="mage:download" width="18" height="18" />
						<span>Resume (PDF)</span>
					</a>
				</div>
			</div>
		</aside>

		<!-- Form -->
		<form onsubmit={handleSubmit} class="rounded-2xl bg-white p-4 md:p-6 ring-1 ring-black/5 shadow-sm space-y-4 md:space-y-5">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<label class="block">
					<span class="mb-1 block text-sm font-medium text-gray-700">Name</span>
					<input name="name" type="text" bind:value={name} autocomplete="name" placeholder="Your name" class="w-full rounded-xl border bg-white px-3 py-2.5 text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" />
				</label>
				<label class="block">
					<span class="mb-1 block text-sm font-medium text-gray-700">Email</span>
					<input name="email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" required class="w-full rounded-xl border bg-white px-3 py-2.5 text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" />
				</label>
			</div>

			<label class="block">
				<span class="mb-1 block text-sm font-medium text-gray-700">Subject</span>
				<input name="subject" type="text" bind:value={subject} placeholder="How can I help?" class="w-full rounded-xl border bg-white px-3 py-2.5 text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" />
			</label>

			<label class="block">
				<span class="mb-1 block text-sm font-medium text-gray-700">Message</span>
				<textarea name="message" bind:value={message} placeholder="Tell me a bit about what you’re looking for…" rows={6} required class="w-full rounded-xl border bg-white px-3 py-2.5 text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"></textarea>
			</label>

			<div class="flex items-center justify-between gap-3">
				<button type="submit" class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm md:text-base font-medium text-white shadow-sm ring-1 ring-inset ring-blue-700/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
					<Icon icon="mage:send" width="18" height="18" />
					<span>Send message</span>
				</button>
				{#if notice === 'sent'}
					<p class="text-xs md:text-sm text-gray-600">Opening your email app…</p>
				{:else if notice === 'error'}
					<p class="text-xs md:text-sm text-red-600">Couldn’t open your email app. Use the direct email on the right.</p>
				{/if}
			</div>
		</form>
	</div>
</section>
