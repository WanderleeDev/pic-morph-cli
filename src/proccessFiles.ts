import { basename, extname, join } from "node:path";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import { imageExtensions, type ImageOptions } from "./types";

const homeDir = os.homedir();
const DEFAULT_OUTPUT_PATH = join(homeDir, "Pictures", "pic-morph");
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

  const outputPath = join(
    DEFAULT_OUTPUT_PATH,
    `${basename(path, extname(path))}${SLUG_PIC_MORPH}.${format}`,
  );
  await image.write(outputPath);

  console.log(`
  |========================================
  |  Output: ${outputPath}
  |======================================== 
      `);

  console.log(`
  |==========================================
  | ✅ Process completed ${basename(path, extname(path))}${SLUG_PIC_MORPH}.${format}
  |==========================================
      `);
}
