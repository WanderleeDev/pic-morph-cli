import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { type TypeFile, typeFile } from "./types";

export type RouteResult = {
  type: TypeFile;
  resolvedPath: string;
};

export function getPathInfo(inputPath: string): RouteResult {
  const resolvedPath = path.resolve(inputPath.trim());
  const stats = fs.statSync(resolvedPath);

  if (stats.isDirectory()) {
    return { type: typeFile.directory, resolvedPath };
  }

  if (stats.isFile()) {
    return { type: typeFile.image, resolvedPath };
  }

  throw new Error(`${inputPath} is not a valid directory or file.`);
}

export async function verifyRoutePath(): Promise<RouteResult> {
  while (true) {
    const route = await inquirer.prompt([
      {
        type: "input",
        name: "direction",
        message: "Enter the path to the image or image directory:",
      },
    ]);
    try {
      const result = getPathInfo(route.direction);
      console.log("✅ Selected path:", result.resolvedPath);
      return result;
    } catch (error) {
      console.log(`${route.direction} is not a valid path.`);
      continue;
    }
  }
}
