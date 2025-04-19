// /pages/api/extract-prd-text.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import { extractTextFromPdf, extractTextFromTxt } from '@/lib/extractors'; // Your custom util

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) return res.status(400).json({ error: 'File upload failed' });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const filePath = file.filepath;
    const ext = file.originalFilename?.split('.').pop()?.toLowerCase();

    let text = '';

    if (ext === 'pdf') {
      text = await extractTextFromPdf(filePath);
    } else if (ext === 'txt') {
      text = await fs.readFile(filePath, 'utf-8');
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    return res.status(200).json({ text });
  });
}
