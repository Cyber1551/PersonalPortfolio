import type { Action } from 'svelte/action';
import { browser } from '$app/environment';

let mermaidPromise: Promise<typeof import('mermaid').default> | null = null;

async function getMermaid() {
	if (!mermaidPromise) {
		mermaidPromise = import('mermaid').then((m) => {
			m.default.initialize({
				startOnLoad: false,
				theme: 'default',
				securityLevel: 'loose',
				fontFamily: 'inherit'
			});
			return m.default;
		});
	}
	return mermaidPromise;
}

/**
 * Svelte action that scans the attached element for mermaid code blocks (`<pre><code class="language-mermaid">...</code></pre>`) and replaces them with rendered SVG. 
 * Re-runs whenever the parameter changes.
 */
export const renderMermaid: Action<HTMLElement, unknown> = (node) => {
	let counter = 0;

	async function run() {
		if (!browser) return;

		const blocks = node.querySelectorAll<HTMLElement>('pre > code.language-mermaid');
		if (blocks.length === 0) return;

		const mermaid = await getMermaid();

		await Promise.all(
			Array.from(blocks).map(async (codeEl) => {
				const pre = codeEl.parentElement;
				if (!pre) return;

				const source = codeEl.textContent ?? '';
				const id = `mermaid-${Date.now()}-${counter++}`;

				try {
					const { svg, bindFunctions } = await mermaid.render(id, source);
					const container = document.createElement('div');
					container.className = 'mermaid-diagram not-prose my-6 flex justify-center';
					container.innerHTML = svg;
					pre.replaceWith(container);
					bindFunctions?.(container);
				} catch (err) {
					console.error('Failed to render mermaid diagram:', err);
					pre.classList.add('mermaid-error');
				}
			})
		);
	}

	void run();

	return {
		update() {
			void run();
		}
	};
};
