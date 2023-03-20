const { chromium } = require('playwright');
const nodemailer = require('nodemailer');

const webPagesPuma = [
    {
        // Hombres, ropa, precio ascendente.
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4301&sortKey=price&sortDirection=ASC',
        max: 2000,
    },
    {
        // Hombres, calzado, precio ascendente.
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4315&sortKey=price&sortDirection=ASC',
        max: 6000,
    },
    {
        // Mujeres, ropa, precio ascendente.
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4298;product_division:4301&sortKey=price&sortDirection=ASC',
        max: 2000,
    },
    {
        // Mujeres, calzado, precio ascendente.
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4298;product_division:4315&sortKey=price&sortDirection=ASC',
        max: 6000,
    },
    {
        // Unisex, accesorios, precio ascendente.
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4311;product_division:4328&sortKey=price&sortDirection=ASC',
        max: 2000,
    },
    {
        // Unisex, calzado, precio ascendente.
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4311;product_division:4315&sortKey=price&sortDirection=ASC',
        max: 6000,
    },
    {
        // Precios justos, precio ascendente.
        url: 'https://ar.puma.com/precios-justos.html?sortKey=price&sortDirection=ASC',
        max: 2000,
    }
];


/**
 * Function sendEmail - Send an email with the results of the web scraping.
 *
 * @param {array} products - Array of products.
 *
 * @return {void}
 */
const sendEmail = (products) => {
    // Create html string.
    let html = '<h1>Productos encontrados</h1>';

    // Loop through each product.
    for (const product of products) {
        html += `
            <div>
                <h3>${product.name}</h3>
                <p><strong>Precio:</strong> ${product.price}</p>
                <a href='${product.link}'><strong>URL:</strong> ${product.link}</a>
            </div>
        `;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'no-reply@juanaressi.com',
            pass: '!LordSosin1'
        }
    });

    const mailOptions = {
        from: 'Mystery <no-reply@juanaressi.com>',
        to: 'Juan.Aressi@hotmail.com',
        subject: 'Web scraping exitoso',
        text: 'El web scraping se ha realizado correctamente.',
        html: html,
    };

    transporter.sendMail(mailOptions);
}


/**
 * Function scrapePuma - Scrape Puma websites.
 *
 * @return {void} - Sends an email with the results if they are found.
 */
async function scrapePuma() {
    for (const webPage of webPagesPuma) {
        // Create a new page.
        let browser = await chromium.launch();
        let page = await browser.newPage();

        // Go to the web page.
        await page.goto(webPage.url);
        console.log('webPage.url: ', webPage.url);

        try {
            // Get all products.
            await page.waitForSelector('.ProductCard', { timeout: 60000 });
            let products = await page.$$('.ProductCard');

            // Array to store the products.
            let productList = [];
            let productPrice = '';

            // Loop through each product.
            for (let product of products) {
                try {
                    // Get product price.
                    await page.waitForSelector('.ProductPrice-CurrentPrice');
                    productPrice = await product.$eval('.ProductPrice-CurrentPrice', el => el.textContent.trim());

                    // If the price has a '$' character, remove it.
                    if (productPrice.includes('$')) {
                        productPrice = productPrice.replace('$', '');
                    }

                    // If the price is < than the max price, save it.
                    if (productPrice < webPage.max) {
                        // Get product name and link.
                        let productName = await product.$eval('.ProductCard-Name', el => el.textContent.trim());
                        let productLink = await product.$eval('.ProductCard-Link', el => el.href);

                        // Make the object and save it to the array.
                        let currentProduct = {
                            name: productName,
                            price: productPrice,
                            link: productLink,
                        };

                        productList.push(currentProduct);
                    }
                } catch (error) {
                    // Exit the loop.
                    break;
                }
            }

            // Send email to notify that the web scraping was successful.
            if (productList.length > 0) {
                console.log('Producto encontrado, procediendo a enviar el email');

                sendEmail(productList);
            }

            // Empty the variables.
            productList = [];

            // Close the browser.
            await browser.close();
        } catch {
            // Obtener el objeto actual, y agregarlo al final del array webPagesPuma, para que se vuelva a ejecutar.
            webPagesPuma.push(webPage);

            await browser.close();
        }
    }
}


// Run the functions.
scrapePuma();