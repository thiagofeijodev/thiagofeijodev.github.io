# LinkedIn data & CV tools

CLI tools that turn a [LinkedIn data export](https://www.linkedin.com/help/linkedin/answer/a1339364) into portfolio content and a downloadable CV PDF.

## What it does

1. **`parse-linkedin-export.js`** — reads a LinkedIn export (folder or `.zip`), parses the CSV files, and writes `src/data/linkedin.json`. Then runs CV generation automatically.
2. **`generate-cv-pdf.js`** — reads `src/data/linkedin.json` and writes `public/cv.pdf`.

The React site imports `linkedin.json` for experience, skills, posts, etc., and links to `/cv.pdf` for download.

## Prerequisites

- **Node.js** 24.x (see root `package.json` engines)
- **`unzip`** on your PATH — required only when passing a `.zip` export (macOS and most Linux distros include it)

Install dependencies from the repo root (workspace setup):

```bash
npm install
```

## Getting a LinkedIn export

1. Go to LinkedIn → **Settings & Privacy** → **Data privacy** → **Get a copy of your data**
2. Request an export that includes at least: **Positions**, **Skills**, **Certifications**, **Education**, **Profile**, and **Shares** (for posts)
3. Download the archive (folder or `.zip`) when LinkedIn emails you

## Usage

Run from the **repository root**:

### Full pipeline (JSON + PDF)

```bash
npm run parse-linkedin -- /path/to/linkedin-export-folder
# or
npm run parse-linkedin -- /path/to/Basic_LinkedInDataExport.zip
```

### PDF only

Regenerates `public/cv.pdf` from the existing `src/data/linkedin.json`:

```bash
npm run generate-cv
```

You can also run commands inside the workspace:

```bash
npm run parse-linkedin -w scripts -- /path/to/export
npm run generate-cv -w scripts
```

## Outputs

| File                     | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `src/data/linkedin.json` | Structured profile, experience, education, certifications, skills, and posts |
| `public/cv.pdf`          | Formatted CV served at `/cv.pdf` on the site                                 |

## Layout

```
scripts/
  package.json              # workspace package (ESM, pdfkit dependency)
  parse-linkedin-export.js  # main entry: export → JSON → PDF
  generate-cv-pdf.js        # JSON → PDF
  utils/
    extractZip.js           # unzip export to a temp directory
    readCSV.js              # read a named CSV from the export folder
    parseCSV.js             # RFC-style CSV parser
    normalizeDate.js        # normalize LinkedIn date strings
    parseShareDate.js       # format share/post dates
    splitCommentary.js      # split post text into title + excerpt
```
