import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};

export default async function handler(req, res) {
  // Create a new formidable form to handle the file upload
  const form = new formidable.IncomingForm({
    uploadDir: './',
    keepExtensions: true, // Keep file extension when uploading
    maxFileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  });

  // Parse the incoming request to get the file
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form data:', err);
      return res.status(500).json({ error: 'Error parsing the file' });
    }

    // Ensure a file is uploaded
    const file = files.file && files.file[0];
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the file's content
    const dataBuffer = fs.readFileSync(file.filepath);

    try {
      // Parse the PDF and extract text
      const data = await pdfParse(dataBuffer);
      res.status(200).json({ text: data.text }); // Return extracted text as response
    } catch (error) {
      console.error('Error parsing PDF:', error);
      res.status(500).json({ error: 'Failed to parse PDF' });
    } finally {
      // Clean up by deleting the uploaded file
      fs.unlinkSync(file.filepath);
    }
  });
}
