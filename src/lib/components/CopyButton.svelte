<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		text: string;
		class?: string;
		successMessage?: string;
		successDuration?: number;
	}

	let {
		text,
		class: className = '',
		successMessage = 'Copied!',
		successDuration = 1500
	}: Props = $props();

	let status: 'idle' | 'copied' | 'error' = $state('idle');

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(text);
			status = 'copied';
			setTimeout(() => {
				status = 'idle';
			}, successDuration);
		} catch {
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
	class={`group flex h-8 min-w-[32px] items-center justify-center rounded-lg transition-all duration-300 ${
		status === 'copied'
			? 'bg-emerald-50 px-3 text-emerald-600 ring-1 ring-emerald-500/20'
			: status === 'error'
				? 'bg-red-50 px-3 text-red-600 ring-1 ring-red-500/20'
				: 'bg-white text-gray-400 shadow-xs ring-1 ring-black/5 hover:bg-gray-50 hover:text-gray-900'
	} ${className}`}
	disabled={status !== 'idle'}
	title={status === 'copied' ? successMessage : 'Copy to clipboard'}
>
	<div class="flex items-center gap-2">
		{#if status === 'copied'}
			<Icon icon="mage:check" width="16" height="16" />
			<span class="text-[10px] font-black tracking-widest uppercase">Copied</span>
		{:else if status === 'error'}
			<Icon icon="mage:close" width="16" height="16" />
			<span class="text-[10px] font-black tracking-widest uppercase">Error</span>
		{:else}
			<Icon
				icon="mage:copy"
				width="16"
				height="16"
				class="transition-transform group-hover:scale-110"
			/>
		{/if}
	</div>
</button>
