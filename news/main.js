
//defining apiKey and assining as variable
const apiKey = 'dff378d934a24d7e8b72c1cb41f4d89c';

//selecting the main section of HTML file and use it in function. 
const main = document.querySelector('main')

//defind the default source
const defaultSource = 'techcrunch'

//selecting sourceSelector if
const sourceSelector = document.querySelector('#sourceSelector');

//adding EventListener to run the fn on initialization and asyncronosly - 
window.addEventListener('load', async e=> {
    updateNews();

    await updateSources();

    //define the default source;
    sourceSelector.value = defaultSource; 

    //adding event listener to change the page on select by value
    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    })
//Implement service worker;
    //In order to have handle the traffic, service worker needs to be in the root of app. so that it can only handle things that
    // are in the same folder in child or older where the actual js file is located;
            // check is it is in navigator, and in case it is in navigator then register your the file as service worker;

//Everytime a user loads your page, the browser will run the navigator.serviceWorker.register code even though the service worker is already installed and running. 
//This allows the browser to detect if there’s a new version of the service worker. 
//When the browser notices that the file has not changed, it just skips the registration call. 
//Once that file changes, the browser understands that there’s a new version of the service worker, thus it installs the new service worker parallel to the currently running service worker.
    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('service-worker-src.js')
            console.log('service worker registered');
        } catch (error) {
            console.log('service worker registeration failed');
        }
    }
})

async function updateSources() {
    const res = await fetch (`https://newsapi.org/v1/sources`)
    const json = await res.json();
//we map the sources array into options tags
    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}"> ${src.name}</option>`).join('\n')
}

//function that fetches data async (to better deal with promises), and fetches data with 'await' - 
//we pass parameter into the fn and assign it as 'defaultSource' that is defined above and 
//pass that parameter in link '...${source}...'
async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${source}&apiKey=${apiKey}`);
    const json = await res.json();
// innerHTML - is used to get or set the HTML content of an element node.
// map - calls the provided function (callback fn) for articles in json file joins each article in a new line - '\n'
    main.innerHTML = json.articles.map(createArticles).join('\n');
}

function createArticles(article) {
return  `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>   
                    <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
        `;
}

//After everything created convert simple vanilla app into PWA; There are three things that are crucial:
// 1. Manifest (can be generatod in webapp manifest generators online) - that is your json file that collects all info 
//             about your application, basically your metadata/metatags in apps;
// 2. service workers - neede to for progress web app to actually device would have an ability to install. 
            //a JavaScript file that runs separately from the main browser thread, intercepting network requests, 
            //caching or retrieving resources from the cache, and delivering push messages; 
            // it can be used to deliver the offline mode; 
    // READ THE REST IN SERVICE WORKER file
           
            
