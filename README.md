# 🖼️ PicMorphCLI - User Guide & Documentation

PicMorphCLI is a fast, interactive command-line interface tool built with **Bun** for resizing, compressing, and converting images (either single images or entire directories). 

This guide covers everything you need to know to install, use, and contribute to PicMorphCLI.

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

## 🚀 Installation Guide

### Prerequisites

You need **Bun** installed on your system. If you don't have it yet, install it via:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Global Installation

To install `pic-morph` globally as a CLI command on your system:

#### Using Bun (Recommended)
```bash
bun install -g @wanderleedev/pic-morph
```

#### Using npm
```bash
npm install -g @wanderleedev/pic-morph
```

---

## 💻 How to Use PicMorphCLI

Once installed globally, you can launch the interactive editor from any terminal. It is designed to be fully interactive, meaning you just start the tool and follow the prompts!

### Step 1: Launch the tool
```bash
pic-morph
```
*(If you are developing locally, run `bun run index.ts` instead)*

### Step 2: Select your Input
The tool will ask you for a path:
```text
? Enter the path to the image or image directory:
```
You can provide either:
- A path to a **single image** (e.g., `./photo.jpg` or `/home/user/Downloads/image.png`)
- A path to a **directory** (e.g., `./images/` or `/home/user/Pictures/raw/`). The tool will automatically find and process all supported images inside that directory.

### Step 3: Choose the Output Format
```text
? Select the output format: 
❯ webp
  png
  jpeg
  avif
  jpg
```
Use your arrow keys to select the desired format and press Enter. 
*(Note: If your system does not have the necessary codecs for AVIF, it will automatically be disabled and greyed out to prevent errors).*

### Step 4: Configure Optimization (Dynamic)
Depending on the format you chose, PicMorphCLI will ask specific optimization questions:
- **WebP**: Ask if conversion should be lossless.
- **PNG**: Ask for compression level (0-9).
- **JPEG/JPG**: Ask to enable progressive conversion.
- **All**: Ask for the desired image quality (1-100).

### Step 5: Resize Images (Optional)
You will be prompted for **width** and **height**. You can press Enter to skip resizing, or type a number. If you choose to resize, you can also select the **fit** mode:
- `fill`: Stretch the image to perfectly fill the given dimensions.
- `inside`: Keep the image's original aspect ratio while ensuring it fits within the given dimensions.

### Step 6: Find your Processed Images!
PicMorphCLI will process your files and automatically save them in your system's pictures directory:
```bash
~/Pictures/pic-morph/
```

---

## 🛠️ For Developers & Contributors

Want to run the code locally or contribute to the project? 

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/WanderleeDev/pic-morph-cli.git
   cd pic-morph-cli
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Run the CLI locally:
   ```bash
   bun run index.ts
   ```

### Running Tests
To run the unit tests, use the built-in test runner:
```bash
bun run test
```

### Releasing a New Version
This project uses `release-it` to manage package versioning, Git commits/tags, and publishing. To release a new version, run:
```bash
bun run release
```
Follow the interactive prompts to bump the version (patch, minor, or major) and automatically create the corresponding Git tags and commits.

---

## 🔍 Troubleshooting

### Unsupported Image Format Error (`ERR_IMAGE_FORMAT_UNSUPPORTED`)
If you see an error like:
```text
❌ Error: El formato de imagen (avif) no está soportado en esta máquina.
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

## 💻 Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Language**: TypeScript
- **Interactive Prompts**: [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
