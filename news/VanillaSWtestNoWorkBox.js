//  // when you open the application tab in devtools, you can find the service worker and manifest. 
//             // there is also a file service worker that we ve created; by the default, when we register a service worker,  
//             // it will continue to serve all the request for that specific domain, 
//             //for that reason there is a button 'skip waiting' to make sw to take in effect or close all the tabs to get newer //version
//             // whenever we make changes, the browser will detect that as a new service worker, especially when it is dev time.
//             // to avoid it check the 'upload on reload' link, which will make sure that all changes are rendered on reload;

// // the first thing we want to do is to cache all the static assets that we have and start our app by loading a cache and when //the user is offline

// // creating the array with static files;
// // relative paths are used in order to be able to run it from github
// //fallback and images oath is for the situations when there is no cache response and no network response;
// // to avoid pile up the files and requests in dynamic file and in situation of updating single assets when only one file was updated redownloading should be done only for that file;
// const staticAssets = [
//     './',
//     './styles.css',
//     './main.js',
//     './fallback.json',
//     './images/images.jpeg'
// ]
// // self - is a referal to the global scope, if window is a context then it will refer to as window.self; 
// //in service worker it referes to the global scope of the service worker
// // when new service worker is discovered it will take all static file and save them for later by using cache api
// // addAll() - takes an array of URL, retreive themand adds the resulting response object to the given cache
// //cashes.open() - returns the promise to resolve to the requested cache object
// self.addEventListener('install', async event => {
//     const cache = await caches.open('news-static');
//     cache.addAll(staticAssets);
// })

// //Here we will run the app on offline mode after we install new service worker. In service worker we can define how to respond to fetch event;
// // fetch event is basically when the serview worker intercepts any network request going from your appication to the net; 
// // respondWith() - its a fetch event method, that prevent browser's default fetch handling and allows you to provide a promise for a response;
// // URL to be able to load the state of the app before we left and the ap became offline to be able continue reading;
// // netwrokFirst() - requests upload from the network 
// // cacheFirst() - request upload from the cache
// self.addEventListener('fetch', event => {
//     const request = event.request;
//     // url is defined to have an ability to upload the state when we left the app and continue reading in offline mode
//     const url = new URL(request.url);

//     if(url.origin ===location.origin) {
//         event.respondWith(cacheFirst(request));
//     } else {
//         event.respondWith(networkFirst(request))
//     }
// });

// // fn that tries to initialize the app with cache files during offline mode;
// // cachedResponse is defined and receives method that will check if we have anything on cache. if yes then return cashed files if not then fetch that request from the network;
// //match() returns promise that resolves to the response associated as the first matching request in the cache object. if no match - promise returns undefined.
// async function cacheFirst(request){
//     const cachedResponse = await caches.match(request);
//         return cachedResponse || fetch(request); 
// }
// //fn that loads and make a request to the network;
// //cashes.put() - allows key/value pairs to be added to the current Cache object. 
// //Usually, it is just fetch method used for one or two requests and add the result to the cache; in that case use addAll() or add() to better deal with that;
// // clone() to clone the results into response, since it can only be read once
// async function networkFirst(request) {
//     const cache = await caches.open('news-dynamic');

//     try{
//         const response = await fetch(request);
//         //so try to go to the network and if not then check the cache; 
//         cache.put(request, response.clone());
//         return response;
//     } catch(error) {
// // instead of returning watever is in the cache when no network response and cache response we store it inside of cachedResponse variable;
//         const cachedResponse = await cache.match(request); 
// // return eaither that cachedResponse or go to main caches and match the json file;
// // fallback file is the json file with the same format as the news responses itself;
//         return cachedResponse || await caches.match('./fallback.json')
//     }
// }