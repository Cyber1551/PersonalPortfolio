<script lang="ts">
  import type { DevlogPost } from '$lib/types';
	import { devPosts } from '$lib/data/devlog';

  // newest first
  const posts: DevlogPost[] = $derived([...devPosts].sort((a, b) => b.date.localeCompare(a.date)));

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
  <title>Development Blog | Brandon Lacy</title>
  <meta name="description" content="Notes and work-in-progress updates across hardware, software, and research." />
</svelte:head>

<section class="w-full px-4 md:px-[10vw] flex-1 min-h-0 py-8 md:py-10">
  <!-- Heading -->
  <div class="text-center">
    <h1 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Development Blog</h1>
    <p class="mt-2 md:mt-3 text-gray-600 text-sm md:text-base">Build logs, experiments, and notes.</p>
  </div>

  <!-- List -->
  <ol class="mt-6 md:mt-8 space-y-5 md:space-y-6">
    {#each posts as post (post.slug)}
      <li class="rounded-2xl bg-white p-4 md:p-5 ring-1 ring-black/5 shadow-sm transition hover:shadow-md">
        <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div class="min-w-0">
            <a href={`/devlog/${post.slug}`} class="text-base md:text-lg font-semibold text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
              {post.title}
            </a>
            <p class="mt-1 text-sm md:text-base text-gray-700 line-clamp-2">{post.summary}</p>
            <p class="mt-1 text-xs md:text-sm text-gray-500">{formatDate(post.date)}</p>
          </div>

          <!-- Tags -->
          {#if post.tags?.length}
            <ul class="flex flex-wrap items-center gap-2">
              {#each post.tags.slice(0, 6) as tag (tag)}
                <li class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs md:text-sm text-gray-700 ring-1 ring-black/5">{tag}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </li>
    {/each}
  </ol>
</section>
