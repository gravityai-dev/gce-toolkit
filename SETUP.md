# Google Gemini Image Generation Node - Setup Guide

## Package Structure

```
@gravityai-dev/gce-imagegen/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Plugin definition
│   ├── GeminiImageGen/
│   │   ├── node/
│   │   │   ├── index.ts      # Node definition
│   │   │   └── executor.ts   # Node executor
│   │   ├── service/
│   │   │   └── index.ts      # Business logic
│   │   └── util/
│   │       └── types.ts      # TypeScript types
│   ├── shared/
│   │   └── platform.ts       # Platform dependencies
│   └── credentials/
│       └── index.ts          # Credential definitions
```

## Installation Steps

1. **Install dependencies:**
   ```bash
   cd /Users/gavinpayne/Documents/Dev/GravityServer/services/gravity-services/packages/gce-imageGen
   npm install
   ```

2. **Build the package:**
   ```bash
   npm run build
   ```

3. **Link for local development (if needed):**
   ```bash
   npm link
   ```

## How It Works

### 1. Plugin Registration (`src/index.ts`)
- Sets up platform dependencies using `setPlatformDependencies()`
- Imports and registers the GeminiImageGen node
- Registers Gemini credentials
- Registers the image generation service

### 2. Node Definition (`src/GeminiImageGen/node/index.ts`)
- Defines node metadata (name, description, category, color, logo)
- Configures inputs (signal from previous nodes)
- Configures outputs (images array, text, metadata)
- Defines config schema with model selection, prompt, number of images, etc.
- Declares credential requirements

### 3. Node Executor (`src/GeminiImageGen/node/executor.ts`)
- Extends PromiseNode base class
- Validates configuration
- Builds credential context
- Calls the image generation service
- Returns formatted output

### 4. Service Layer (`src/GeminiImageGen/service/index.ts`)
- Fetches Gemini API credentials
- Initializes Google GenAI client
- Streams image generation response
- Processes image chunks and text responses
- Returns base64-encoded images with metadata

## Configuration Options

- **Model**: gemini-2.5-flash-image-preview or gemini-2.0-flash-exp
- **Image Prompt**: Text description (supports template syntax `{{input.field}}`)
- **Number of Images**: 1-10 images per generation
- **Output Format**: base64 (embedded) or url (requires storage)
- **File Name Prefix**: Optional prefix for generated files

## Outputs

```typescript
{
  images: [
    {
      data: "base64_encoded_image...",
      mimeType: "image/png",
      fileName: "generated_image_0.png"
    }
  ],
  text: "Optional text response from Gemini",
  metadata: {
    model: "gemini-2.5-flash-image-preview",
    imageCount: 1,
    timestamp: "2025-01-15T10:30:00Z"
  }
}
```

## Next Steps

1. Run `npm install` to install dependencies
2. Run `npm run build` to compile TypeScript
3. Register the package in the main plugin loader
4. Test with a workflow that uses the Gemini Image Gen node
