const { chromium } = require('playwright');
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');

async function scrapeWebsite() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://ar.puma.com/hoody-cai-ftblculture-523370-03.html?color=1916');

    // Aquí puedes utilizar las funciones de Playwright para navegar la página y extraer la información que necesitas
    const price = await page.$eval('.ProductPrice-CurrentPrice', el => el.innerText);

    console.log(price);

    await browser.close();

    // Aquí puedes agregar una condición para determinar si se debe enviar un correo electrónico o no
    // const shouldSendEmail = true;

    // if (shouldSendEmail) {
    //     const transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: 'tu_correo@gmail.com',
    //             pass: 'tu_contraseña'
    //         }
    //     });

    //     const mailOptions = {
    //         from: 'tu_correo@gmail.com',
    //         to: 'destinatario@example.com',
    //         subject: 'Web scraping exitoso',
    //         text: 'El web scraping se ha realizado correctamente.'
    //     };

    //     await transporter.sendMail(mailOptions);
    // }
}

// Utiliza la función de cron para programar la ejecución del web scraper cada 15 minutos
// cron.schedule('*/15 * * * *', () => {
    scrapeWebsite();
// });
