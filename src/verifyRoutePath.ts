import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { type TypeFile, typeFile } from "./types";

export type RouteResult = {
  type: TypeFile;
  resolvedPath: string;
};

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
      const resolvedPath = path.resolve(route.direction.trim());
      const stats = fs.statSync(resolvedPath);
      console.log("✅ Selected path:", resolvedPath);

      if (stats.isDirectory()) {
        return { type: typeFile.directory, resolvedPath };
      }

      if (stats.isFile()) {
        return { type: typeFile.image, resolvedPath };
      }

      console.log(`${route.direction} is not a valid path.`);
      continue;
    } catch (error) {
      console.log(`${route.direction} is not a valid path.`);
      continue;
    }
  }
}
