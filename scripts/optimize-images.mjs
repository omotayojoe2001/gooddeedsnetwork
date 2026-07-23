/**
 * Compresses images in public/ with sharp.
 * Run: npm run optimize-images
 * Sync KEEP_PATHS with src/lib/site-data.ts when gallery assets change.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const OUTREACH_DIR = "Cloth the clothless outreach images ikotun";

/** Paths referenced by the site (ASSETS + GALLERY_IMAGES). No leading slash. */
const KEEP_PATHS = new Set([
  "logo.jpg",
  "hero-outreach.jpg",
  "founder.jpg",
  "volunteers.jpg",
  "genrev-ng.png",
  "genrev-app.png",
  "favicon.ico",
  `${OUTREACH_DIR}/20250116_174301.jpg`,
  `${OUTREACH_DIR}/20250116_174358.jpg`,
  `${OUTREACH_DIR}/20250116_174407.jpg`,
  `${OUTREACH_DIR}/20250116_181046.jpg`,
  `${OUTREACH_DIR}/20250116_181124.jpg`,
  `${OUTREACH_DIR}/20250116_181234.jpg`,
  `${OUTREACH_DIR}/20250116_181340.jpg`,
  `${OUTREACH_DIR}/20250116_181500.jpg`,
  `${OUTREACH_DIR}/20250116_182102.jpg`,
  `${OUTREACH_DIR}/20250116_183714.jpg`,
  `${OUTREACH_DIR}/20250116_190946.jpg`,
]);

const RULES_BY_BASENAME = {
  "logo.jpg": { maxWidth: 320, jpegQuality: 85 },
  "hero-outreach.jpg": { maxWidth: 1920, jpegQuality: 82 },
  "founder.jpg": { maxWidth: 1000, jpegQuality: 82 },
  "volunteers.jpg": { maxWidth: 1400, jpegQuality: 82 },
  "genrev-ng.png": { maxWidth: 512, webpQuality: 85 },
  "genrev-app.png": { maxWidth: 512, webpQuality: 85 },
};

const GALLERY_RULE = { maxWidth: 1200, jpegQuality: 80, webpQuality: 82 };
const IMAGE_EXT = /\.(jpe?g|png)$/i;
const REMOVE_EXT = /\.(jpe?g|png|mp4|mov|webm)$/i;

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

function rulesFor(relPath) {
  const base = path.basename(relPath);
  if (RULES_BY_BASENAME[base]) return RULES_BY_BASENAME[base];
  if (relPath.startsWith(`${OUTREACH_DIR}/`)) return GALLERY_RULE;
  return { maxWidth: 1600, jpegQuality: 82, webpQuality: 82 };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function removeUnusedImages() {
  const all = await walk(PUBLIC);
  let removed = 0;
  let freed = 0;

  for (const full of all) {
    if (!REMOVE_EXT.test(full)) continue;
    const rel = path.relative(PUBLIC, full).replace(/\\/g, "/");
    if (KEEP_PATHS.has(rel)) continue;
    // Keep WebP companions for images we serve
    if (rel.endsWith(".webp") && KEEP_PATHS.has(rel.replace(/\.webp$/i, ".jpg"))) continue;
    if (rel.endsWith(".webp") && KEEP_PATHS.has(rel.replace(/\.webp$/i, ".png"))) continue;

    const stat = await fs.stat(full);
    freed += stat.size;
    await fs.unlink(full);
    removed += 1;
    console.log(`  removed unused: ${rel} (${formatBytes(stat.size)})`);

    // Drop stale WebP if the source JPEG/PNG was unused
    const webp = full.replace(/\.(jpe?g|png)$/i, ".webp");
    try {
      const webpStat = await fs.stat(webp);
      await fs.unlink(webp);
      freed += webpStat.size;
    } catch {
      /* no companion webp */
    }
  }

  return { removed, freed };
}

async function optimizeImage(fullPath) {
  const rel = path.relative(PUBLIC, fullPath).replace(/\\/g, "/");
  const before = (await fs.stat(fullPath)).size;
  const rules = rulesFor(rel);
  const ext = path.extname(fullPath).toLowerCase();
  const tmp = `${fullPath}.opt.tmp`;

  let pipeline = sharp(fullPath).rotate(); // respect EXIF orientation
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > rules.maxWidth) {
    pipeline = pipeline.resize({ width: rules.maxWidth, withoutEnlargement: true });
  }

  if (ext === ".png") {
    await pipeline.png({ quality: 80, compressionLevel: 9, effort: 10 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: rules.jpegQuality ?? 82, mozjpeg: true }).toFile(tmp);
  }

  await fs.rename(tmp, fullPath);

  // WebP companion for smaller delivery in modern browsers
  const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, ".webp");
  let webpPipeline = sharp(fullPath);
  const webpMeta = await webpPipeline.metadata();
  if (webpMeta.width && webpMeta.width > rules.maxWidth) {
    webpPipeline = webpPipeline.resize({ width: rules.maxWidth, withoutEnlargement: true });
  }
  await webpPipeline.webp({ quality: rules.webpQuality ?? 82 }).toFile(webpPath);

  const after = (await fs.stat(fullPath)).size;
  const webpSize = (await fs.stat(webpPath)).size;
  console.log(
    `  optimized ${rel}: ${formatBytes(before)} → ${formatBytes(after)} (webp ${formatBytes(webpSize)})`,
  );
  return { before, after, webpSize };
}

async function main() {
  console.log("Removing unused images from public/ …");
  const { removed, freed } = await removeUnusedImages();
  console.log(`Removed ${removed} unused file(s), freed ${formatBytes(freed)}.\n`);

  const keepFiles = [...KEEP_PATHS]
    .filter((p) => IMAGE_EXT.test(p))
    .map((p) => path.join(PUBLIC, ...p.split("/")));

  console.log("Compressing site images …");
  let totalBefore = 0;
  let totalAfter = 0;

  for (const full of keepFiles) {
    try {
      await fs.access(full);
    } catch {
      console.warn(`  skip missing: ${path.relative(PUBLIC, full)}`);
      continue;
    }
    const { before, after } = await optimizeImage(full);
    totalBefore += before;
    totalAfter += after;
  }

  console.log(
    `\nDone. Kept images: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
