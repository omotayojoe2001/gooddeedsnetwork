# Good Deeds Network

Nonprofit marketing site. Keep commits focused and the main branch deployable.

## Images (important)

Site speed depends on keeping `public/` small. Do **not** drop raw phone photos or video files into `public/` without optimizing first.

**After adding or replacing images:**

```sh
npm run optimize-images
```

This script (`scripts/optimize-images.mjs`):

- Compresses and resizes images used on the site
- Generates `.webp` companions (served automatically via `OptimizedImage`)
- Removes unused JPEG/PNG/MP4 files from `public/` that are not referenced by the site

**When you add gallery photos:** update both `GALLERY_IMAGES` in `src/lib/site-data.ts` and `KEEP_PATHS` in `scripts/optimize-images.mjs`.

**Videos:** use YouTube embeds only. Never commit `.mp4` files to `public/` (they are gitignored).

**Paystack:** set `VITE_PAYSTACK_PUBLIC_KEY` in Vercel env vars only. Never commit live keys.
