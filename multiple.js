const { chromium } = require('playwright');

const shops = [
	{
		name: 'Puma',
		item: 'Ropa de hombre, talle L, pagina 1',
		url: 'https://ar.puma.com/deportes.html?customFilters=gender:4397;size:21&page=1',
		checkPrice: async ( { page } ) => {
			// await page.waitForFunction(() => {
			// 	const items = document.querySelector( '.ProductPrice-CurrentPrice data' );

			// 	console.log( items );
			// 	// return repoCards.length > 30;
			// });
			const item = await page.locator( '.ProductPrice-CurrentPrice data' );
			console.log( item );


			// const priceShown = await page.textContent( 'bo' );

			// console.log( priceShown );
			// const defaultPrice = 9999;

			// let priceRange = '';

			// if ( priceShown < defaultPrice * 0.1 ) {
			// 	priceRange = '90% off';
			// } else if ( priceShown < defaultPrice * 0.2 ) {
			// 	priceRange = '80% off';
			// } else if ( priceShown < defaultPrice * 0.3 ) {
			// 	priceRange = '70% off';
			// } else if ( priceShown < defaultPrice * 0.4 ) {
			// 	priceRange = '60% off';
			// } else if ( priceShown < defaultPrice * 0.5 ) {
			// 	priceRange = '50% off';
			// } else if ( priceShown < defaultPrice * 0.6 ) {
			// 	priceRange = '40% off';
			// } else if ( priceShown < defaultPrice * 0.7 ) {
			// 	priceRange = '30% off';
			// } else if ( priceShown < defaultPrice * 0.8 ) {
			// 	priceRange = '20% off';
			// } else if ( priceShown < defaultPrice * 0.9 ) {
			// 	priceRange = '10% off';
			// }

			// return priceRange;
			// console.log( priceShown );
		}
	},
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
		}

		await browser.close();
	}

	await browser.close();
} )();