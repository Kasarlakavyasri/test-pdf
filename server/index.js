const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/form', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a PDF document
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, 'forms', `${name.replace(/\s+/g, '_')}.pdf`);

  // Pipe the PDF into a file
  doc.pipe(fs.createWriteStream(filePath));

  // Add content to the PDF
  doc.fontSize(25).text('Form Submission Details', { align: 'center' });
  doc.text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Phone: ${phone}`);
  doc.text(`Message: ${message}`);

  // Finalize the PDF and end the stream
  doc.end();

  res.status(200).json({ message: 'Form submitted and PDF created!' });
});

// Create a directory to store PDFs if it doesn't exist
const dir = path.join(__dirname, 'forms');
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
