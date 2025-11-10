import type { DevlogPost } from '$lib/types';

export const devPosts: DevlogPost[] = [];

export function getPostBySlug(slug: string): DevlogPost | undefined {
  return devPosts.find((p) => p.slug === slug);
}