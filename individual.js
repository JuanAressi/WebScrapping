const { chromium } = require('playwright');

const shops = [
	{
		name: 'Puma',
		item: 'Short Titular Independente',
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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Camiseta Titular CAI',
		url: 'https://ar.puma.com/camiseta-titular-promo-de-independiente-para-hombre-771560-01.html?color=2657',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 15999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Medias Independiente',
		url: 'https://ar.puma.com/camiseta-titular-promo-de-independiente-para-hombre-771560-01.html?color=2657',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 2499;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Buzo de Independiente',
		url: 'https://ar.puma.com/buzo-cai-ftblculture-para-mujeres-766561-02.html?color=8503',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 14999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Short de Training',
		url: 'https://ar.puma.com/shorts-de-training-de-tejido-plano-de-20-cm-521548-50.html?color=8027',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 11999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Short de Training',
		url: 'https://ar.puma.com/shorts-de-training-de-tejido-plano-de-20-cm-521548-01.html?color=127',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 11999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Pantalon deportivo negro',
		url: 'https://ar.puma.com/pantalones-deportivos-de-training-en-tejido-de-punto-521837-01.html?color=127',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 16999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Campera de training gris',
		url: 'https://ar.puma.com/campera-de-training-con-cierre-completo-521544-42.html?color=8389',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 20999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Campera de training negra',
		url: 'https://ar.puma.com/campera-de-training-con-cierre-completo-521544-01.html?color=127',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 20999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Campera deportiva gris',
		url: 'https://ar.puma.com/campera-deportiva-con-capucha-bmw-m-motorsport-533370-03.html?color=272',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 24999;

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
			}

			return priceRange;
		}
	},
	{
		name: 'Puma',
		item: 'Camiseta Manchester City Titular',
		url: 'https://ar.puma.com/camiseta-titular-replica-manchester-city-759202-01.html?color=5727',
		checkPrice: async ( { page } ) => {
			const priceShown = await page.textContent( 'span[itemprop="lowPrice"]' );
			const defaultPrice = 13999;

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
			}

			return priceRange;
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
			console.log( `"${ name }" has "${ item }" on sale for about "${ priceRange }"` );
			console.log( `Check it out here: "${ url }"` );

			await page.screenshot( { path: `./screenshots/${ name }: ${ item }.png` } );
		}

		await page.close();
	}

	await browser.close();
} )();