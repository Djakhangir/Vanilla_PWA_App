//to use workbox-sw: can be used as CDN and can be used,local node-library and workbox cli. 
//link: https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js
//Information about service worker and detailed description in sw.js file

//I used workbox-cli here to make the workbox implementation easier and with flexible configs.
//workbox helps us to avoid piling up the files when one is updated change that one file and refresh instead of reloading all the files;

//first we need to import library 
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//Routes and file to load;
const staticAssets = [
    './',
    './index.html',
    './styles.css',
    './main.js',
    './fallback.json',
    './images/images.jpeg'
 ];

//setConfig(helps us in debuggin purposes);
 workbox.setConfig({ debug: true });

//to cache images for offline mode;

    // strategies provides the most comn caching strtgs, wb strtgs is a pattern that dtrmns how a SW gen. rspns after receive a fetch event. 
workbox.routing.registerRoute('https://newsapi.org/(.*)', new workbox.strategies.NetworkFirst());

    // CacheFirst strategy to cache runtime images and style sheets
workbox.routing.registerRoute(
    new RegExp(/.*\.(png|jpg|jpeg|gif)/), 
    new workbox.strategies.CacheFirst({
        cacheName:'news-images',
        cacheExpiration: {maxEntries:20, maxAgeSeconds: 12 * 60 * 60},
        cacheableReponse: {statuses: [0, 200]},
        purgeOnQuotaError: true
}))

    // To cache stylesheet
workbox.routing.registerRoute(
    new RegExp('\.css$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'My-awesome-cache-Stylesheets',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 20, // only cache 20 request
                purgeOnQuotaError: true
            })
        ]
    })
);

    // Cache new articles result;
//StaleWhileRevalidate strategy to cache runtime News API response;
//StaleWhileRevalidate will go to the network and the cache at the same time. Return the cache’s response to the page (while in the background) it will use the new network response to update the cache for the next time it’s used.
workbox.routing.registerRoute(
    new RegExp('https://newsapi.org/(.*)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-app-cache', // my cache news articles
        cacheExpiration: {
          maxAgeInSeconds: 60 * 30 //the cache will be expired in 30m
        }
      })
);

//precaching the the files;
workbox.precaching.precacheAndRoute(staticAssets);
workbox.precaching.precacheAndRoute([]);





