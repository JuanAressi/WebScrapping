const { chromium } = require('playwright');

const shops = [
    {
        name: 'Puma',
        item: 'Ropa de hombre, talle L, pagina 1',
        url: 'https://ar.puma.com/deportes.html?customFilters=gender:4397;size:21&page=1',
        checkPrice: async ({ page }) => {
            const items = await page.$$('.ProductCard');
            const itemsURL = await page.$$('.ProductCard .ProductCard-Link');
            const itemsName = await page.$$('.ProductCard .ProductCard-Name');
            const itemsPrice = await page.$$('.ProductCard .ProductPrice-CurrentPrice data');
            const count = await items.length;

            console.log('count: ' + count);

            let i = 0;

            for (i; i < count; i++) {
                const itemURL = await itemsURL[i].getAttribute('href');
                const itemName = await itemsName[i].innerText();
                const itemPrice = await itemsPrice[i].innerText();

                console.log('The item: ' + itemName + ' has a price of: ' + itemPrice + ' and the URL is: https://ar.puma.com/' + itemURL);

                // if ( priceRange !== '' ) {
                // 	console.log( `${ name } has ${ item } on sale for ${ priceRange }` );
                // 	console.log( `Check it out here: ${ url }` );
                // }
            }
        }
    },
];

(async () => {
    // const browser = await chromium.launch();
    const browser = await chromium.launch({ headless: false });	// Para ver el navegador.

    for (const shop of shops) {
        const { url, checkPrice } = shop;

        const page = await browser.newPage();
        await page.goto(url);

        await checkPrice({ page });

        await browser.close();
    }

    await browser.close();
})();