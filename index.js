const { chromium } = require('playwright');

const shops = [
	{
		name: 'Puma',
		item: 'Short CAI',
		url: 'https://ar.puma.com/short-titular-promo-de-independiente-para-hombre-771563-01.html?color=2657',
		checkPrice: async ( { browser, url } ) => {
			const page = await browser.newPage();
			await page.goto( url );
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 9999;

			let priceRange = '';

			if ( priceShown < defaultPrice * 0.25 ) {
				priceRange = '75% off';
			} else if ( priceShown < defaultPrice * 0.5 ) {
				priceRange = '50% off';
			} else if ( priceShown < defaultPrice * 0.75 ) {
				priceRange = '25% off';
			}
		
			return priceRange;
		}
	},
];

( async () => {
	const browser = await chromium.launch();

	for ( const shop of shops ) {
		const { name, item, url, checkPrice } = shop;
		const priceRange = await checkPrice( { browser, url } );

		if ( priceRange !== '' ) {
			console.log( `${ name } has ${ item } on sale for ${ priceRange }` );
			console.log( `Check it out here: ${ url }` );
		}
	}

	await browser.close();
} )();