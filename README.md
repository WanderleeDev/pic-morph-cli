# 🖼️ PicMorphCLI - CLI Image Editor

PicMorphCLI is a fast, interactive command-line interface tool built with **Bun** for resizing, compressing, and converting images (either single images or entire directories).

---

## ✨ Features

- **Format Conversion**: Convert images between `webp`, `png`, `jpeg`/`jpg`, and `avif` formats.
- **Bulk Processing**: Process a single image file or batch-convert all images within an entire directory.
- **Image Resizing**: Resize images by specifying a custom width and height, supporting various fit options (`fill`, `inside`).
- **Advanced Optimization Options**:
  - WebP Lossless conversion toggle.
  - Custom PNG compression levels (0-9).
  - Progressive JPEG output toggle.
  - Image quality adjustments (1-100).
- **Auto-output**: Dynamically saves all processed images to your user home `Pictures/pic-morph/` directory, creating it automatically if it does not exist.

---

## 🚀 Getting Started

### Prerequisites

You need **Bun** installed on your system. If you don't have it yet, install it via:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Clone or navigate into the project directory:
   ```bash
   cd pic-morph
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

---

## 💻 Usage

To launch the interactive CLI editor, run:

```bash
bun run index.ts
```

Follow the prompts to enter:
1. The **relative or absolute path** to your image or directory containing images.
2. The desired **output format** (WebP, PNG, JPEG, AVIF, JPG).
3. Optimization preferences (quality, progressive, compression level, lossless).
4. Custom **dimensions (width/height)** for resizing (optional).

### Example Output Path

Processed files will be saved in your system's pictures directory at:
```bash
~/Pictures/pic-morph/
```

---

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Languages**: TypeScript
- **Interactive Prompts**: [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
