///<reference lib="webworker" />

let sw: ServiceWorker = <any>self;

sw.addEventListener('install', () => {
	console.info('installing servicewoker');
});