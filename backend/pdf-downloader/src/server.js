require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
// const bodyParser = require('body-parser');
const { configureCors } = require('./config/corsConfig');
const helmet = require('helmet');

const app = express();
app.use(configureCors());
app.use(helmet());
// app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json({ limit: '5mb' }));

app.post('/api/resume/generate-pdf', async (req, res) => {
  const { formData, template } = req.body;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const previewURL = `http://localhost:5173/preview?template=${template}`;

  await page.goto(previewURL, { waitUntil: 'networkidle0' });

  // Inject resume data to localStorage
  await page.evaluate((data) => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, formData);

  await page.reload({ waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=resume.pdf',
  });
    res.send(pdfBuffer);
});

const PORT=process.env.PORT;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));