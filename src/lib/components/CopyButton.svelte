
<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		text: string;
		class?: string;
		successMessage?: string;
		successDuration?: number;
	}

	let { text, class: className = '', successMessage = 'Copied!', successDuration = 1500 }: Props = $props();

	let status: 'idle' | 'copied' | 'error' = $state('idle');

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(text);
			status = 'copied';
			setTimeout(() => {
				status = 'idle';
			}, successDuration);
		} catch (err) {
			status = 'error';
			setTimeout(() => {
				status = 'idle';
			}, 2000);
		}
	}
</script>

<button
	type="button"
	onclick={copyToClipboard}
	class={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
		status === 'copied' ? 'bg-green-50 border-green-200 text-green-700' :
		status === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
		'bg-white text-gray-800 hover:bg-gray-50'
	} ${className}`}
	disabled={status !== 'idle'}
>
	{#if status === 'copied'}
		<Icon icon="mage:check" width="16" height="16" />
		<span>{successMessage}</span>
	{:else if status === 'error'}
		<Icon icon="mage:close" width="16" height="16" />
		<span>Error</span>
	{:else}
		<Icon icon="mage:copy" width="16" height="16" />
		<span>Copy</span>
	{/if}
</button>