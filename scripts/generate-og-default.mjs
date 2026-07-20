import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const width = 1200;
const height = 630;
const accent = "#02A1FF";

const logoTextPath = path.join(root, "public/images/whiteguard-logo-text-white.svg");
const logoIconPath = path.join(root, "public/images/logo-icon.svg");
const outPath = path.join(root, "public/images/og-default.png");

const wordmark = await sharp(logoTextPath)
  .resize({
    width: 560,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();
const wordmarkMeta = await sharp(wordmark).metadata();

const icon = await sharp(logoIconPath)
  .resize({
    width: 96,
    height: 96,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();
const iconMeta = await sharp(icon).metadata();

const iconW = iconMeta.width ?? 96;
const iconH = iconMeta.height ?? 96;
const wordmarkW = wordmarkMeta.width ?? 560;
const wordmarkH = wordmarkMeta.height ?? 60;

const iconLeft = Math.round((width - iconW) / 2);
const wordmarkLeft = Math.round((width - wordmarkW) / 2);
const stackHeight = iconH + 28 + wordmarkH;
const stackTop = Math.round((height - stackHeight) / 2) - 20;
const taglineY = stackTop + stackHeight + 56;

const svgOverlay = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#001a2a"/>
        <stop offset="100%" stop-color="#003859"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect x="0" y="0" width="8" height="100%" fill="${accent}"/>
    <text x="50%" y="${taglineY}" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#8eb4cc"
      letter-spacing="1.5">Cybersecurity for MENA Enterprises</text>
  </svg>
`);

await sharp(svgOverlay)
  .composite([
    { input: icon, left: iconLeft, top: stackTop },
    {
      input: wordmark,
      left: wordmarkLeft,
      top: stackTop + iconH + 28,
    },
  ])
  .png({ quality: 90 })
  .toFile(outPath);

const out = await sharp(outPath).metadata();
console.log(
  `Created OG image: ${out.width}x${out.height} (${fs.statSync(outPath).size} bytes)`,
);
