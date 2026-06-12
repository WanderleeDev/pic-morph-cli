import inquirer from "inquirer";
import { unlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { imageExtensions, type ImageOptions } from "./types";

async function checkAvifSupport(): Promise<boolean> {
  const tempPath = path.join(
    os.tmpdir(),
    `pic-morph-avif-test-${Date.now()}.png`,
  );
  try {
    const png1x1 = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64",
    );
    await Bun.write(tempPath, png1x1);
    const result = Bun.file(tempPath).image().avif().toBuffer();
    if (result instanceof Promise) {
      await result;
    }
    await unlink(tempPath);
    return true;
  } catch (e) {
    try {
      await unlink(tempPath);
    } catch {}
    return false;
  }
}

export async function collectParams(): Promise<ImageOptions> {
  const isAvifSupported = await checkAvifSupport();

  return await inquirer.prompt([
    {
      type: "select",
      name: "format",
      message: "Select the output format: ",
      choices: [
        { name: imageExtensions.webp, value: imageExtensions.webp },
        { name: imageExtensions.png, value: imageExtensions.png },
        { name: imageExtensions.jpeg, value: imageExtensions.jpeg },
        {
          name: imageExtensions.avif,
          value: imageExtensions.avif,
          disabled: !isAvifSupported
            ? "Not supported on this machine (install libavif/libheif)"
            : false,
        },
        { name: imageExtensions.jpg, value: imageExtensions.jpg },
      ],
    },
    {
      type: "confirm",
      name: "lossless",
      message: "Should WebP conversion be lossless? (default: true)",
      default: true,
      when: (answers) => answers.format === imageExtensions.webp,
    },
    {
      type: "number",
      name: "compressionLevel",
      message:
        "Enter the compression level (0-9), or press enter for default (6): ",
      default: 6,
      when: (answers) => answers.format === imageExtensions.png,
      validate: (input: string) => {
        const num = parseInt(input);
        if (isNaN(num) || num < 0 || num > 9) {
          return "Invalid compression level. Please enter a number between 0 and 9.";
        }
        return true;
      },
    },
    {
      type: "confirm",
      name: "progressive",
      message: "Enable progressive JPEG conversion? (default: false)",
      default: false,
      when: (answers) =>
        answers.format === imageExtensions.jpeg ||
        answers.format === imageExtensions.jpg,
    },
    {
      type: "number",
      name: "quality",
      message: "Enter the quality (1-100), or press enter for default (80): ",
      default: 80,
      validate: (input: string) => {
        const num = parseInt(input);
        if (isNaN(num) || num < 1 || num > 100) {
          return "Invalid quality. Please enter a number between 1 and 100.";
        }
        return true;
      },
    },
    {
      type: "number",
      name: "width",
      message: "Enter the width: ",
      validate: (input: string) => {
        const num = parseInt(input);
        if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
          return "Invalid width. Please enter a number greater than or equal to 1.";
        }
        return true;
      },
    },
    {
      type: "number",
      name: "height",
      message: "Enter the height: ",
      validate: (input: string) => {
        const num = parseInt(input);
        if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
          return "Invalid height. Please enter a number greater than or equal to 1.";
        }
        return true;
      },
    },
    {
      type: "select",
      name: "fit",
      message: "Select the fit (default: fill): ",
      when: (answers) => answers.width || answers.height,
      default: "fill",
      choices: [
        {
          name: "fill - stretch the image to fill the given width and height",
          value: "fill",
        },
        {
          name: "inside - keep the image's aspect ratio and fit within the given width and height",
          value: "inside",
        },
      ],
    },
  ]);
}
