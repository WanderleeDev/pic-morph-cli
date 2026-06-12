export const options = {
  resize: "resize",
  changeFormat: "changeFormat",
  editQuality: "editQuality",
} as const;

export const typeFile = {
  image: "image",
  directory: "directory",
} as const;

export const imageExtensions = {
  jpg: "jpg",
  jpeg: "jpeg",
  png: "png",
  webp: "webp",
  avif: "avif",
} as const;

export type ImageOptions = {
  format: ImageExtension;
  lossless: boolean;
  compressionLevel: number;
  progressive: boolean;
  quality: number;
  width: number;
  height: number;
  fit: "fill" | "inside";
};

export const imageExtensionsValues = Object.values(
  imageExtensions,
) as ImageExtension[];

export type ImageExtension = keyof typeof imageExtensions;
export type Options = keyof typeof options;
export type TypeFile = keyof typeof typeFile;
