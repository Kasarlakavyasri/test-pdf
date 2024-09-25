const { PDFDocument } = require('pdf-lib'); // Ensure you have this library installed
const fs = require('fs');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, message } = data;

    // Create a PDF document (example with pdf-lib)
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`, { x: 50, y: 600 });

    const pdfBytes = await pdfDoc.save();

    // Save the PDF to a file or return it directly
    // For this example, we are not saving the PDF, but you can implement saving logic

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'PDF generated successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate PDF' }),
    };
  }
};
