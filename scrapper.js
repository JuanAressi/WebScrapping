const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
// const cron = require('node-cron');

async function scrapeWebsite() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Puma: Hombre, ropa, pagina 1.
    await page.goto('https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4301&page=1');

    let size = 0;

    // Get all the product links, name and price.
    const products = await page.evaluate(() => {
        const products = document.querySelectorAll('.ProductCard');
        const productsArray = [];
        size = products.length;
        
        products.forEach((product) => {
            if (product !== null) {
                const productLink = product.querySelector('a').getAttribute('href');
                const productName = product.querySelector('.product-item-link').innerText;
                const productPrice = product.querySelector('.price').innerText;

                productsArray.push({
                    productLink,
                    productName,
                    productPrice
                });
            }
        });
        
        return productsArray;
    });

    console.log(size);
    console.log(products);
        

    // Aquí puedes utilizar las funciones de Puppeteer para navegar la página y extraer la información que necesitas

    await browser.close();

    // Aquí puedes agregar una condición para determinar si se debe enviar un correo electrónico o no
    const shouldSendEmail = true;

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
