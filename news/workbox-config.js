//File containing the path of the service worker’s source and compiled file and precache configuration

module.exports = {
    "globDirectory": "www/",
    "globPatterns": [
      "**/*.{css,html,js,png}"
    ],
    "swDest": "www/main.js",
    "swSrc": "service-worker-src.js"
  };

  ////injectManifest as it provides more control and flexibility to configure the service worker
  //InjectingManifest with workbox cli instruct that swSrc file as a base and generated file will be called