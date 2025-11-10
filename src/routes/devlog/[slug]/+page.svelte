<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { getPostBySlug } from '$lib/data/devlog';

  const slug = $derived(page.params.slug ?? '');
  const post = $derived(getPostBySlug(slug));

  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(d);
    } catch {
      return iso;
    }
  }
</script>

<svelte:head>
  <title>{post ? `${post.title} | Development Blog | Brandon Lacy` : 'Development Blog | Brandon Lacy'}</title>
  <meta name="description" content={post ? post.summary : 'Development blog post'} />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
  <a href="/devlog" class="inline-flex items-center gap-2 text-sm md:text-base text-gray-700 hover:text-gray-900">
    <Icon icon="mage:chevron-left" width="18" height="18" />
    <span>Back to Dev Blog</span>
  </a>

  {#if post}
    <header class="mt-4 md:mt-6">
      <h1 class="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">{post.title}</h1>
      <div class="mt-2 flex flex-wrap items-center gap-2 text-sm md:text-base text-gray-600">
        <time datetime={post.date}>{formatDate(post.date)}</time>
        {#if post.tags?.length}
          <span aria-hidden="true">·</span>
          <ul class="flex flex-wrap items-center gap-2">
            {#each post.tags as tag (tag)}
              <li class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700 ring-1 ring-black/5">{tag}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </header>

    <article class="prose prose-zinc max-w-none md:prose-lg mt-6">
      {#if post.content?.length}
        {#each post.content as para (para)}
          <p>{para}</p>
        {/each}
      {:else}
        <p class="text-gray-500">Write-up coming soon.</p>
      {/if}
    </article>
  {:else}
    <p class="mt-10 text-center text-gray-500">Post not found. <a href="/devlog" class="text-blue-600 hover:underline">Back to list</a></p>
  {/if}
</section>
