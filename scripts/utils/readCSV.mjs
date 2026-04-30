import { readFile } from 'fs/promises';
import { join } from 'path';
import { parseCSV } from './parseCSV.mjs';

export async function readCSV(folder, filename) {
  try {
    const text = await readFile(join(folder, filename), 'utf8');
    return parseCSV(text);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`Warning: ${filename} not found in export folder, skipping.`);
      return [];
    }
    throw err;
  }
}
