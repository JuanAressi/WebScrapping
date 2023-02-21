const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

async function sendEmail(data) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your_email@example.com',
        pass: 'your_password'
    }
  });

  let info = await transporter.sendMail({
    from: '"Web Scraper" <your_email@example.com>',
    to: 'receiver_email@example.com',
    subject: 'Web Scraping Results',
    text: data
  });

  console.log("Email sent: " + info.response);
}

function scrape() {
  request('https://example.com', function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      // Aquí puedes escribir el código para extraer la información de la página
      let data = 'Data obtained from scraping: ' + ...;
      sendEmail(data);
    }
  });
}

cron.schedule('*/15 * * * *', () => {
  scrape();
});
