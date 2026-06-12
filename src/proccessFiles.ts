import { basename, extname } from "node:path";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { imageExtensions, type ImageOptions } from "./types";

const homeDir = process.env.HOME || os.homedir();
const DEFAULT_OUTPUT_PATH = path.join(homeDir, "Pictures", "pic-morph");
const SLUG_PIC_MORPH = "-pm";

export async function processFiles(path: string, options: ImageOptions) {
  const {
    format,
    quality,
    width,
    height,
    lossless,
    compressionLevel,
    progressive,
    fit,
  } = options;

  let image = Bun.file(path).image();

  if (width && height) {
    image = image.resize(width, height, { fit });
  }

  switch (format) {
    case imageExtensions.webp:
      image = image.webp({ quality, lossless });
      break;
    case imageExtensions.png:
      image = image.png({ compressionLevel });
      break;
    case imageExtensions.jpeg:
    case imageExtensions.jpg:
      image = image.jpeg({ quality, progressive });
      break;
    case imageExtensions.avif:
      image = image.avif({ quality });
      break;
    default:
      image = image.webp({ quality });
      break;
  }

  await mkdir(DEFAULT_OUTPUT_PATH, { recursive: true });

  const outputPath = `${DEFAULT_OUTPUT_PATH}/${basename(path, extname(path))}${SLUG_PIC_MORPH}.${format}`;
  image.write(outputPath);

  console.log(`
========================================
  Output: ${outputPath}
========================================
    `);

  console.log(`
  ==========================================
    ✅ Process completed
  ==========================================
    `);
}
