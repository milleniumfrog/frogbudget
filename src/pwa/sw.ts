///<reference lib="webworker" />
declare const VERSION: string;

let sw: ServiceWorker = <any>self;

const CACHE = 'frogbudget-' + VERSION;

async function precache() {
	console.info('precache');
	if(await caches.has(CACHE)) {
		console.info('cache exists')
		return;
	} else {
		console.info('delete caches')
		let keys = await caches.keys();
		for(let key of keys) {
			console.info(`delete cache ${key}`);
			await caches.delete(key);
		}
		let cache = await caches.open(CACHE);
		console.info('create new cache');
		return cache.addAll([
			// fonts
			// brands-400
			`fa-brands-400.e8019d507e8cb51d169ab4f94a0cda12.eot`,
			`fa-brands-400.83e6c29fb363b2f0ea6cc18fefff729c.svg`,
			`fa-brands-400.fdf44bc43e8fa2358bbb7d9165d78455.ttf`,
			`fa-brands-400.da408238128b876cbda6424391f1566f.woff`,
			`fa-brands-400.6814d0e8136d34e313623eb7129d538e.woff2`,
			// regular-400
			`fa-regular-400.8d9ab84bfe87a3f77112a6698cf639fb.woff2`,
			`fa-regular-400.ba2a91dc95e6cfdc4b2a186a7ba83e29.svg`,
			`fa-regular-400.8d220c793e2612bd131ed8522c54669f.ttf`,
			'fa-regular-400.dad90637f797356bbc70d2664832e0b6.woff',
			'fa-regular-400.e6c93cb47e716b579264a5fdfbf7e84d.eot',
			// fa-solid-900
			'fa-solid-900.2d0415fa29ea596b7a02c78eddeede20.woff',
			'fa-solid-900.132e9759d93e4eefd7cdde0d7a322991.ttf',
			'fa-solid-900.b75b4bfe0d58faeced5006c785eaae23.woff2',
			'fa-solid-900.de1d242d8acb26ec43c0d071fe78e72d.svg',
			'fa-solid-900.ea363ed422723673917901680be9b37c.eot',
			// ionicons
			'ionicons.2c159d0d05473040b53ec79df8797d32.woff',
			'ionicons.19e65b89cee273a249fba4c09b951b74.eot',
			'ionicons.aff28a207631f39ee0272d5cdde43ee7.svg',
			'ionicons.dd4781d1acc57ba4c4808d1b44301201.ttf',
			// Material Design Icons
			'Material-Design-Iconic-Font.b351bd62abcd96e924d9f44a3da169a7.ttf',
			'Material-Design-Iconic-Font.a4d31128b633bc0b1cc1f18a34fb3851.woff2',
			'Material-Design-Iconic-Font.d2a55d331bdd1a7ea97a8a1fbb3c569c.woff',
			// own code
			'index.html',
			'/frogbudget/',
			'icons-df37451e1a7c92800a2e47065a4f3d72/favicon.ico',
			`pwa.${VERSION}.js`,
			`vendors~pwa.chunk.${VERSION}.js`,
			`vendors~pwa.${VERSION}.css`,
			`pwa.${VERSION}.css`
		]);
	}
}

async function fromCache(request: RequestInfo) {
	console.info('fetch');
	let cache = await caches.open(CACHE);
	let matching = await cache.match(request);
	return matching || await fetch(request);
}

sw.addEventListener('install', async (evt: any) => {
	console.info('installing servicewoker for version ' + VERSION);
	evt.waitUntil(precache());
});

sw.addEventListener('fetch', (evt: any) => {
	console.info('fetch');
	console.info(evt.request);
	evt.respondWith(fromCache(evt.request));
});
