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
			`fa-brands-400.${VERSION}.eot`,
			`fa-brands-400.${VERSION}.svg`,
			`fa-brands-400.${VERSION}.ttf`,
			`fa-brands-400.${VERSION}.woff`,
			`fa-brands-400.${VERSION}.woff2`,
			`fa-regular-400.${VERSION}.eot`,
			`fa-regular-400.${VERSION}.svg`,
			`fa-regular-400.${VERSION}.ttf`,
			`fa-regular-400.${VERSION}.woff`,
			`fa-regular-400.${VERSION}.woff2`,
			`fa-solid-900.${VERSION}.eot`,
			`fa-solid-900.${VERSION}.svg`,
			`fa-solid-900.${VERSION}.ttf`,
			`fa-solid-900.${VERSION}.woff`,
			`fa-solid-900.${VERSION}.woff2`,
			`ionicons.${VERSION}.eot`,
			`ionicons.${VERSION}.svg`,
			`ionicons.${VERSION}.ttf`,
			`ionicons.${VERSION}.woff`,
			`Material-Design-Iconic-Font.${VERSION}.ttf`,
			`Material-Design-Iconic-Font.${VERSION}.woff`,
			`Material-Design-Iconic-Font.${VERSION}.woff2`,
			// own code
			'index.html',
			'/',
			'icons-df37451e1a7c92800a2e47065a4f3d72/favicon.ico',
			`sw.js`,
			`pwa.${VERSION}.js`,
			`vendors~pwa.chunk.${VERSION}.js`,
			`vendors~pwa.${VERSION}.css`,
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
	evt.respondWith(fromCache(evt.request));
});
