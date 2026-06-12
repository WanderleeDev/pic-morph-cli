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

To install `pic-morph` globally as a CLI command on your system:

#### Using Bun (Recommended)
```bash
bun install -g WanderleeDev/pic-morph-cli
```

#### Using npm
```bash
npm install -g WanderleeDev/pic-morph-cli
```

#### For Local Development & Contributors
1. Clone the repository:
   ```bash
   git clone https://github.com/WanderleeDev/pic-morph-cli.git
   cd pic-morph-cli
   ```
2. Install dependencies and link the command globally:
   ```bash
   bun install
   chmod +x index.ts
   bun link
   ```

---

## 💻 Usage

Once installed globally, you can launch the interactive CLI editor from any terminal:

```bash
pic-morph
```

If you are developing locally and want to run it directly:

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

## 🧪 Running Tests

To run the unit tests with Bun:

```bash
bun test
```

---

## 🔍 Troubleshooting

### Unsupported Image Format Error (`ERR_IMAGE_FORMAT_UNSUPPORTED`)
If you see an error like:
```text
error: Image: format not supported on this machine (HEIC/AVIF/TIFF require the OS codec; AVIF encode needs an AV1 encoder)
code: "ERR_IMAGE_FORMAT_UNSUPPORTED"
```
This happens because Bun's native image processor delegates encoding/decoding of modern formats (like AVIF or HEIC) to system-level libraries. You can resolve this by installing the required codecs:

- **Debian/Ubuntu Linux**:
  ```bash
  sudo apt-get update
  sudo apt-get install -y libavif-dev libheif-dev
  ```
- **macOS (via Homebrew)**:
  ```bash
  brew install shared-mime-info libavif libheif
  ```

---

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Languages**: TypeScript
- **Interactive Prompts**: [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
