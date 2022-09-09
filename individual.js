const { chromium } = require('playwright');

const shops = [
	{
		name: 'Puma',
		item: 'Short CAI',
		url: 'https://ar.puma.com/short-titular-promo-de-independiente-para-hombre-771563-01.html?color=2657',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 9999;

			let priceRange = '';

			if ( priceShown < defaultPrice * 0.1 ) {
				priceRange = '90% off';
			} else if ( priceShown < defaultPrice * 0.2 ) {
				priceRange = '80% off';
			} else if ( priceShown < defaultPrice * 0.3 ) {
				priceRange = '70% off';
			} else if ( priceShown < defaultPrice * 0.4 ) {
				priceRange = '60% off';
			} else if ( priceShown < defaultPrice * 0.5 ) {
				priceRange = '50% off';
			} else if ( priceShown < defaultPrice * 0.6 ) {
				priceRange = '40% off';
			} else if ( priceShown < defaultPrice * 0.7 ) {
				priceRange = '30% off';
			} else if ( priceShown < defaultPrice * 0.8 ) {
				priceRange = '20% off';
			} else if ( priceShown < defaultPrice * 0.9 ) {
				priceRange = '10% off';
			}

			return priceRange;
		}
	},
	// {
	// 	name: 'Adidas',
	// 	item: 'Camiseta ARG',
	// 	url: 'https://www.adidas.com.ar/camiseta-titular--argentina-22/HB9215.html?cm_sp=SLOT-4.4-_-GLP_MEN_GLP_HOME_%3F-_-PRODUCTSELECTIONCAROUSEL-PRODUCT-CARD-_-938069',
	// 	checkPrice: async ( { page } ) => {
	// 		// const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
	// 		const defaultPrice = 9999;

	// 		let priceRange = '';

	// 		if ( priceShown < defaultPrice * 0.1 ) {
	// 			priceRange = '90% off';
	// 		} else if ( priceShown < defaultPrice * 0.2 ) {
	// 			priceRange = '80% off';
	// 		} else if ( priceShown < defaultPrice * 0.3 ) {
	// 			priceRange = '70% off';
	// 		} else if ( priceShown < defaultPrice * 0.4 ) {
	// 			priceRange = '60% off';
	// 		} else if ( priceShown < defaultPrice * 0.5 ) {
	// 			priceRange = '50% off';
	// 		} else if ( priceShown < defaultPrice * 0.6 ) {
	// 			priceRange = '40% off';
	// 		} else if ( priceShown < defaultPrice * 0.7 ) {
	// 			priceRange = '30% off';
	// 		} else if ( priceShown < defaultPrice * 0.8 ) {
	// 			priceRange = '20% off';
	// 		} else if ( priceShown < defaultPrice * 0.9 ) {
	// 			priceRange = '10% off';
	// 		}

	// 		return priceRange;
	// 	}
	// }
];

( async () => {
	// const browser = await chromium.launch();
	const browser = await chromium.launch( { headless: false } );	// Para ver el navegador

	for ( const shop of shops ) {
		const { name, item, url, checkPrice } = shop;

		const page = await browser.newPage();
		await page.goto( url );

		const priceRange = await checkPrice( { page } );

		if ( priceRange !== '' ) {
			console.log( `${ name } has ${ item } on sale for ${ priceRange }` );
			console.log( `Check it out here: ${ url }` );

			await page.screenshot( { path: `./screenshots/${ name }: ${ item }.png` } );
		}

		await page.close();
	}

	await browser.close();
} )();