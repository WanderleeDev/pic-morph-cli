#!/usr/bin/env bun
import { verifyRoutePath } from "./src/verifyRoutePath";
import { processFiles } from "./src/proccessFiles";
import { readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { imageExtensionsValues, type ImageExtension } from "./src/types";
import { collectParams } from "./src/collectParams";

async function printOptions() {
  console.log(`
  |===========================================
  |   🖼️  PicMorphCLI - CLI Image Editor
  |===========================================
     - Change formats
     - Resize images
     - Convert files fast
  `);
  const { resolvedPath, type } = await verifyRoutePath();
  const options = await collectParams();

  if (type === "image") {
    await processFiles(resolvedPath, options);
  }

  if (type === "directory") {
    const files = readdirSync(resolvedPath).filter((f) => {
      const ext = extname(f).toLocaleLowerCase().replace(".", "");
      return imageExtensionsValues.includes(ext as ImageExtension);
    });

    console.log(`
  |==========================================
  |   Processing ${files.length} images
  |==========================================
    `);

    for (const file of files) {
      await processFiles(join(resolvedPath, file), options);
    }
  }
}

printOptions();
