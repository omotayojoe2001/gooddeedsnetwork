# Good Deeds Network

Marketing website for Good Deeds Network, a nonprofit in Lagos, Nigeria connecting givers and receivers through community outreach, free marketing classes, and volunteer powered support.

## Development

```sh
git clone https://github.com/omotayojoe2001/gooddeedsnetwork.git
cd gooddeedsnetwork
npm i
npm run dev
```

## Images

Large unoptimized photos were the main cause of slow loads and slow deploys. The site now uses compressed assets (~3 MB total in `public/` instead of ~725 MB).

**When you add new photos to `public/`**, always run:

```sh
npm run optimize-images
```

Then commit the optimized JPEG/PNG and WebP files together.

- Only images listed in `src/lib/site-data.ts` are kept; unused files in `public/` are removed by the script.
- If you add gallery photos, also update `KEEP_PATHS` in `scripts/optimize-images.mjs`.
- Use YouTube for video, not local `.mp4` files.

## Deployment

- **Vercel:** set `VITE_PAYSTACK_PUBLIC_KEY` (public key only) in Project → Environment Variables.
- Push to `main` triggers a redeploy.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- sharp (image optimization, dev only)
