/**
 * Builds the knocked-out certification marks used by the home page's
 * "Standards we work to" block.
 *
 * The six supplied badges are greyscale but of opposite polarity: ISO 27001 and
 * SOC 2 are dark ink printed on a light disc, while ISO 27001 Annex A, GDPR and
 * NIST are light ink baked onto an opaque dark plate. Shown on the navy band
 * they read as three bright discs and three dark slabs, which is why no single
 * container or CSS filter ever made the six sit together.
 *
 * Mapping luminance to alpha - inverted for the dark-ink badges - reduces all
 * six to the same thing: a white mark on transparency. `lo`/`hi` are the
 * luminance window that separates ink from ground, read off each file's
 * histogram; everything below `lo` becomes fully transparent and everything
 * above `hi` fully opaque.
 *
 * Run: node scripts/generate-certification-marks.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "public/images/certifications");
const outDir = path.join(srcDir, "marks");

/**
 * polarity: "dark"  - ink is darker than its ground (seals on a light disc)
 *           "light" - ink is lighter than its ground (marks on a dark plate)
 *           "alpha" - already a silhouette on transparency; keep its own alpha
 */
const SPECS = [
  { file: "certification-0.png", out: "iso-27001.png", polarity: "dark", lo: 0.1, hi: 0.72 },
  { file: "certification-1.png", out: "soc-2.png", polarity: "dark", lo: 0.1, hi: 0.72 },
  { file: "certification-2.png", out: "pci-dss.png", polarity: "alpha" },
  { file: "certification-3.png", out: "iso-27001-annex-a.png", polarity: "light", lo: 0.18, hi: 0.7 },
  { file: "certification-4.png", out: "gdpr.png", polarity: "light", lo: 0.45, hi: 0.85 },
  { file: "certification-5.png", out: "nist-800-53.png", polarity: "light", lo: 0.48, hi: 0.78 },
];

/**
 * The sources are only 64-108px across. Resampling up before the threshold
 * gives the alpha edge something to anti-alias against, so the marks stay
 * smooth on a 2x screen. It adds no detail that was not there.
 */
const SCALE = 3;

const clamp = (x) => Math.max(0, Math.min(1, x));

fs.mkdirSync(outDir, { recursive: true });

for (const spec of SPECS) {
  const src = path.join(srcDir, spec.file);
  const meta = await sharp(src).metadata();
  const width = meta.width * SCALE;
  const height = meta.height * SCALE;

  const { data } = await sharp(src)
    .ensureAlpha()
    .resize(width, height, { kernel: "lanczos3", fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(width * height * 4);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let p = 0; p < width * height; p++) {
    const sourceAlpha = data[p * 4 + 3] / 255;
    const lum =
      (0.299 * data[p * 4] + 0.587 * data[p * 4 + 1] + 0.114 * data[p * 4 + 2]) / 255;

    let alpha;
    if (spec.polarity === "alpha") {
      alpha = sourceAlpha;
    } else {
      const ink = spec.polarity === "dark" ? 1 - lum : lum;
      alpha = clamp((ink - spec.lo) / (spec.hi - spec.lo)) * sourceAlpha;
    }

    out[p * 4] = 255;
    out[p * 4 + 1] = 255;
    out[p * 4 + 2] = 255;
    const a = Math.round(alpha * 255);
    out[p * 4 + 3] = a;

    /* Knocking the plate out leaves the ink adrift on the plate's old canvas,
       so track the ink bounds and crop to them. Every mark then fills its slot
       in the layout instead of carrying invisible padding. */
    if (a > 10) {
      const x = p % width;
      const y = (p / width) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const dest = path.join(outDir, spec.out);
  await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .png({ compressionLevel: 9, palette: true })
    .toFile(dest);

  const { size } = fs.statSync(dest);
  console.log(
    `${spec.out.padEnd(24)} ${String(maxX - minX + 1).padStart(4)}x${String(maxY - minY + 1).padEnd(4)} ${(size / 1024).toFixed(1)}KB`,
  );
}
