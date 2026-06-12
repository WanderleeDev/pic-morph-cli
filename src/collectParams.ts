import inquirer from "inquirer";
import {
  imageExtensions,
  imageExtensionsValues,
  type ImageExtension,
  type ImageOptions,
} from "./types";

export async function collectParams(): Promise<ImageOptions> {
  return await inquirer.prompt([
    {
      type: "select",
      name: "format",
      message: "Enter the output format (webp, png, jpeg) (optional): ",
      choices: [
        { name: imageExtensions.webp },
        { name: imageExtensions.png },
        { name: imageExtensions.jpeg },
        { name: imageExtensions.avif },
        { name: imageExtensions.jpg },
      ],
      validate: (input: ImageExtension) => {
        if (!imageExtensionsValues.includes(input)) {
          const formatter = new Intl.ListFormat("en", {
            style: "long",
            type: "conjunction",
          });
          return `Invalid format. Please enter ${formatter.format(imageExtensionsValues)}.`;
        }
        return true;
      },
    },
    {
      type: "confirm",
      name: "lossless",
      message:
        "Should WebP conversion be lossless? (default: true)",
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
