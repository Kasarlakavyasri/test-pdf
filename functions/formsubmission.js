const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { name, email, phone, message } = JSON.parse(event.body);

  // Create a PDF document
  const doc = new PDFDocument();
  const filePath = path.join('/tmp', `${name.replace(/\s+/g, '_')}.pdf`);

  // Pipe the PDF into a file
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Add content to the PDF
  doc.fontSize(25).text('Form Submission Details', { align: 'center' });
  doc.text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Phone: ${phone}`);
  doc.text(`Message: ${message}`);

  // Finalize the PDF and end the stream
  doc.end();

  // Wait for the write stream to finish
  await new Promise((resolve) => writeStream.on('finish', resolve));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Form submitted and PDF created!' }),
  };
};
