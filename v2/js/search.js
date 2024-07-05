const ProxyApi = "https://proxy.sb543267gmailcom.workers.dev/?u=";
    searchapi = "/search/",
    
    AvailableServers = ["https://asta-api.sb543267gmailcom.workers.dev/","https://vip-gamma.vercel.app/" ,"https://api3.sb543267gmailcom.workers.dev/","https://api100.sb543267gmailcom.workers.dev/","https://api1.sb543267gmailcom.workers.dev/"];
function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}
async function getJson(e, t = 0) {
    let a = getApiServer(""),
        r = a + e;
    if (t > 2) throw `Too many errors while fetching ${r}`;
    t > 0 && (console.log("Retrying fetch using proxy"), (r = "" + r));
    try {
        let s = await fetch(r);
        return await s.json();
    } catch (n) {
        return console.error(n), getJson(e, t + 1);
    }
  }
async function RefreshLazyLoader() {
    let e = new IntersectionObserver((e, t) => {
            e.forEach((e) => {
                if (e.isIntersecting) {
                    let t = e.target;
                    t.src = t.dataset.src;
                }
            });
        }),
        t = document.querySelectorAll("img.lzy_img");
    t.forEach((t) => {
        e.observe(t);
    });
}
function sentenceCase(e) {
    return (
        null !== e &&
        "" !== e &&
        (e = e.toString()).replace(/\w\S*/g, function (e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
        })
    );
}
let hasNextPage = !0;
async function SearchAnime(e, t = 1) {
    let a = await getJson("/search/" + e + "?page=" + t),
        r = a.results,
        s = document.getElementById("latest2"),
        n = document.getElementById("load"),
        l = "";
    if (0 == r.length) throw "No results found";
    for (let i = 0; i < r.length; i++) {
        let o = r[i];
        o.title.toLowerCase().includes("dub") ? (o.subOrDub = "DUB") : (o.subOrDub = "SUB"),
            (l += `<a href="./anime.html?anime_id=${
                o.id
            }"><div class="poster la-anime"> <div id="shadow1" class="shadow"> <div class="dubb">${o.subOrDub.toUpperCase()}</div></div><div id="shadow2" class="shadow"> <img class="lzy_img" src="static\Spinner@1x-0.2s-200px-200px.svg" data-src="${
                o.img
            }"> </div><div class="la-details"> <h3>${sentenceCase(o.title)}</h3> <div id="extra"> <span>${o.releaseDate}</span> </div></div></div></a>`);
    }
    return (s.innerHTML += l), (n.style.display = "none"), (s.style.display = "block"), a.hasNextPage;
}
const params = new URLSearchParams(window.location.search),
    query = params.get("query");
let page = 1;
async function loadData() {
    try {
        let e = await SearchAnime(query, page);
        (hasNextPage = e), (page += 1), RefreshLazyLoader(), console.log("Search animes loaded");
    } catch (t) {
        (document.getElementById("main-section").style.display = "none"), (document.getElementById("error-page").style.display = "block"), (document.getElementById("error-desc").innerHTML = t), console.error(t);
    }
}
null == query && window.location.replace("./index.html"),
    (document.getElementById("latest").innerHTML = `Search Results: ${query}`),
    window.addEventListener("scroll", () => {
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight &&
            !0 == hasNextPage &&
            SearchAnime(query, page).then((e) => {
                (hasNextPage = e), (page += 1), RefreshLazyLoader(), console.log("Search animes loaded");
            });
    }),
    loadData();

    const cache = new Map();

    function getDataFromAPI(id) {
      if (cache.has(id)) {
        return cache.get(id);
      } else {
        const data = fetch(`https://asta-api.sb543267gmailcom.workers.dev/data/${id}`);
        cache.set(id, data);
        return data;
      }
    }
    
    const promises = [
        fetch('https://asta-api.sb543267gmailcom.workers.dev/data/1'),
        fetch('https://api.example.com/data/2'),
        fetch('https://api.example.com/data/3')
      ];
      
      Promise.all(promises).then(responses => {
        const data = responses.map(response => response.json());
        // process the data
      }).catch(error => {
        console.error(error);
      });
    
      const db = require('pg');
    
    const pool = new db.Pool({
      user: 'admin',
      host: 'localhost',
      database: 'api',
      password: 'root',
      port: 5432
    });
    
    app.get('/', (req, res) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error connecting to database' });
        } else {
          client.query('SELECT * FROM users WHERE id = $1', [1], (err, result) => {
            release();
            if (err) {
              console.error(err);
              res.status(500).send({ message: 'Error querying database' });
            } else {
              res.json(result.rows);
            }
          });
        }
      });
    });
    
    // Check if the API response is in the cache
    if (localStorage.getItem('apiResponse')) {
        // If the response is in the cache, use it
        const apiResponse = JSON.parse(localStorage.getItem('apiResponse'));
        // Use the API response
      } else {
        // If the response is not in the cache, make a request to the server
        fetch('https://asta-api.sb543267gmailcom.workers.dev/')
          .then(response => response.json())
          .then(data => {
            // Store the API response in the cache
            localStorage.setItem('apiResponse', JSON.stringify(data));
            // Use the API response
          });
      }

      const domainsToPrefetch = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdn.jsdelivr.net',
        'https://kit.fontawesome.com',
        // Add other domains you want to prefetch and preload
      ];
      
      domainsToPrefetch.forEach((domain) => {
        const resource = document.createElement('resource');
        resource.href = domain;
        resource.rel = 'prefetch dns-prefetch';
        document.head.appendChild(resource);
      });