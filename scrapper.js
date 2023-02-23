const { chromium } = require('playwright');
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');

async function scrapePuma() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Puma: hombres, ropa, pagina 1.
    await page.goto('https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4301');

    // Obtener todos los elementos que tengan la clase .ProductCard.
    const totalItems = await page.$$('.CategoryItemsCount-ItemsValue');

    // Ejemplo: si hay un total de 260 productos, y se muestran 36 por paginas, deberíamos loopear por las 8 paginas.
    
    console.log('totalItems: ', totalItems.innerText());

    const itemsURL   = await page.$$('.ProductCard .ProductCard-Link');
    const itemsName  = await page.$$('.ProductCard .ProductCard-Name');
    const itemsPrice = await page.$$('.ProductCard .ProductPrice-CurrentPrice data');
    const count      = await itemsURL.length;

    for (i = 0; i < count; i++) {
        const itemURL = await itemsURL[i].getAttribute('href');
        const itemName = await itemsName[i].innerText();
        const itemPrice = await itemsPrice[i].innerText();

        if (itemPrice < 2000) {
            console.log('The item: ' + itemName + ' has a price of: ' + itemPrice + ' and the URL is: https://ar.puma.com/' + itemURL);
        }
    }

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
    scrapePuma();
// });


const websites = [
    {
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4301&page=1',
        descripción: 'Puma: hombres, ropa, pagina 1.',
    },
    {
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4301&page=2',
        descripción: 'Puma: hombres, ropa, pagina 2.',
    },
    {
        url: 'https://ar.puma.com/hombres.html?customFilters=gender:4397;product_division:4301&page=3',
        descripción: 'Puma: hombres, ropa, pagina 3.',
    },
]