<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Compare Anything

A high-precision technical diff utility designed for side-by-side comparison of structured configurations or code.

View your app in AI Studio: https://ai.studio/apps/3ef1f27c-46e3-41d7-8161-84a8c67543e0

## Features
- **Split & Unified Views:** Compare texts side-by-side or inline.
- **Customizable Granularity:** Granular control over ignore whitespace and case insensitivity.
- **Save Snapshots:** Capture and save code snapshots for future reference.
- **History Trail:** Local offline history tracking to re-visit past comparisons.
- **Drag & Drop Upload:** Upload local text files to automatically compute diff lines immediately.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key (if required).
3. Run the app:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/components`: UI components including the main `CompareTool`, `SavedView`, and `HistoryView`.
- `src/utils`: Contains the LCS dynamic programming logic used to compute differences (`diff.ts`).
- `src/types.ts`: Application type definitions.
- `src/initialData.ts`: Initial cache state and dummy user data.
