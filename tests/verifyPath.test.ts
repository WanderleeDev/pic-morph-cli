import { describe, test, expect } from "bun:test";
import { getPathInfo } from "../src/verifyRoutePath";
import { typeFile } from "../src/types";
import path from "path";

describe("getPathInfo", () => {
  test("should identify a directory correctly", () => {
    const srcDir = path.resolve(__dirname, "../src");
    const result = getPathInfo(srcDir);
    expect(result.type).toBe(typeFile.directory);
    expect(result.resolvedPath).toBe(srcDir);
  });

  test("should identify a file correctly", () => {
    const pkgJson = path.resolve(__dirname, "../package.json");
    const result = getPathInfo(pkgJson);
    expect(result.type).toBe(typeFile.image);
    expect(result.resolvedPath).toBe(pkgJson);
  });

  test("should throw an error for a non-existent path", () => {
    expect(() => {
      getPathInfo("./non-existent-file-path-12345");
    }).toThrow();
  });
});
