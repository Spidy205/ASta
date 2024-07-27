const ProxyApi = "https://proxy11.sb543267gmailcom.workers.dev/?u=";
    animeapi = "/anime/",
    episodeapi = "/episode/",
    dlapi = "/download/",
    
    AvailableServers = ["https://googolplex-api.vercel.app/","https://asta-api.sb543267gmailcom.workers.dev/","https://vip-gamma.vercel.app/" ,"https://api3.sb543267gmailcom.workers.dev/","https://api100.sb543267gmailcom.workers.dev/","https://api1.sb543267gmailcom.workers.dev/"];
function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}
async function getJson(e, t = 0) {
    let s = getApiServer(""),
        i = s + e;
    if (t > 100) throw `Too many errors while fetching ${i}`;
    t > 0 && (console.log("Retrying fetch using proxy"), (i = "" + i));
    try {
        let a = await fetch(i);
        return await a.json();
    } catch (l) {
        return console.error(l), getJson(e, t + 1);
    }
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
function capitalizeFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
}
async function loadVideo(e, t) {
    let s = urlParams.get("anime") + "-episode-" + urlParams.get("episode");
    try {
        document.getElementById("ep-name").innerHTML = e;
        let i = document.getElementById("serversbtn"),
            a = t.sources[0].file;
        return (
            (i.innerHTML += `<div class="sitem"> <a class="sobtn sactive" onclick="selectServer(this)" data-value="./embed.html?url=${a}&id=${s}">AD Free 1</a> </div>`),
            document.getElementsByClassName("sactive")[0].click(),
            (a = t.sources_bk[0].file),
            (i.innerHTML += `<div class="sitem"> <a class="sobtn" onclick="selectServer(this)" data-value="./embed.html?url=${a}&id=${s}">AD Free 2</a> </div>`),
            !0
        );
    } catch (l) {
        return !1;
    }
}
async function loadServers(e, t = !0) {
    let s = document.getElementById("serversbtn");
    for (let [i, a] of ((html = ""), Object.entries(e)))
        "vidcdn" != i &&
            ("Streamwish" == (i = capitalizeFirstLetter(i))
                ? (html += `<div class="sitem"> <a class="sobtn" onclick="selectServer(this,true)" data-value="${a}">${i}</a> </div>`)
                : (html += `<div class="sitem"> <a class="sobtn" onclick="selectServer(this)" data-value="${a}">${i}</a> </div>`));
    (s.innerHTML += html), !1 == t && document.getElementsByClassName("sobtn")[0].click();
}
function selectServer(e, t = !1) {
    let s = document.getElementsByClassName("sobtn"),
        i = document.getElementById("LiteStreamFrame");
    !0 == t ? (i.sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation") : i.removeAttribute("sandbox"), (i.src = e.getAttribute("data-value"));
    for (let a = 0; a < s.length; a++) s[a].className = "sobtn";
    e.className = "sobtn sactive";
}
function showDownload() {
    (document.getElementById("showdl").style.display = "show"),
        document.getElementById("dldiv").classList.toggle("show"),
        getDownloadLinks(urlParams.get("anime"), urlParams.get("episode")).then(() => {
            console.log("Download links loaded");
        });
}
let Episode_List = [];
async function getEpUpperList(e) {
    let t = Number(EpisodeID.split("-episode-")[1].replace("-", "."));
    Episode_List = e;
    let s = e.length,
        i = "";
    for (let a = 0; a < e.length; a++) {
        let l = Number(e[a][0].replaceAll("-", "."));
        if ((l - 1) % 100 == 0) {
            let o;
            s - l < 100
                ? ((o = `${l} - ${s}`),
                  l <= t && t <= s ? ((i += `<option id="default-ep-option" class="ep-btn" data-from=${l} data-to=${s}>${o}</option>`), getEpLowerList(l, s)) : (i += `<option class="ep-btn" data-from=${l} data-to=${s}>${o}</option>`))
                : ((o = `${l} - ${l + 99}`),
                  l <= t && t <= l + 99
                      ? ((i += `<option id="default-ep-option" class="ep-btn" data-from=${l} data-to=${l + 99}>${o}</option>`), getEpLowerList(l, l + 99))
                      : (i += `<option class="ep-btn" data-from=${l} data-to=${l + 99}>${o}</option>`));
        }
    }
    (document.getElementById("ep-upper-div").innerHTML = i), (document.getElementById("default-ep-option").selected = !0), console.log("Episode list loaded");
}
async function getEpLowerList(e, t) {
    let s = Number(EpisodeID.split("-episode-")[1].replace("-", ".")),
        i = "",
        a = Episode_List.slice(e - 1, t);
    for (let l = 0; l < a.length; l++) {
        let o = a[l][1],
            n = Number(a[l][0].replaceAll("-", ".")),
            r;
        (r = `${n}`),
            n === s
                ? ((n = String(n).replaceAll(".", "-")), (i += `<a class="ep-btn-playing ep-btn" href="./episode.html?anime_id=${AnimeID}&episode_id=${o}">${r}</a>`))
                : (i += `<a class="ep-btn" href="./episode.html?anime_id=${AnimeID}&episode_id=${o}">${r}</a>`);
    }
    document.getElementById("ep-lower-div").innerHTML = i;
}
async function episodeSelectChange(e) {
    let t = e.options[e.selectedIndex];
    getEpLowerList(parseInt(t.getAttribute("data-from")), parseInt(t.getAttribute("data-to")));
}
async function getDownloadLinks(e, t) {
    let s = (await getJson("/download/" + EpisodeID)).results,
        i = "";
    for (let [a, l] of Object.entries(s)) {
        let o = a.split("x")[1],
            n = l;
        i += `<div class="sitem"> <a class="sobtn download" target="_blank" href="${n}"><i class="fa fa-download"></i>${o}p</a> </div>`;
    }
    document.getElementById("dllinks").innerHTML = i;
}
function retryImageLoad(e) {
    let t = e.src;
    (e.src = "static\Spinner@1x-0.2s-200px-200px.svg"),
        setTimeout(() => {
            if (t.includes("?t=")) {
                let s = Number(t.split("?t=")[1]) + 1;
                s < 5 && (e.src = t.split("?t=")[0] + "?t=" + String(s));
            } else e.src = t + "?t=1";
        }, 3e3);
}
const windowWidth = window.innerWidth;
function plusSlides(e) {
    1 === e ? (document.getElementById("slider-carousel").scrollLeft += windowWidth / 2) : -1 === e && (document.getElementById("slider-carousel").scrollLeft -= windowWidth / 2);
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
const queryString = window.location.search,
    urlParams = new URLSearchParams(queryString),
    AnimeID = urlParams.get("anime_id"),
    EpisodeID = urlParams.get("episode_id");
async function loadEpisodeData(e) {
    e = e.results;
    let t = e.name,
        s = e.stream,
        i = e.servers;
    document.documentElement.innerHTML = document.documentElement.innerHTML.replaceAll("{{ title }}", t);
    try {
        if (null == s) throw "Failed To Load Ad Free Servers";
        loadVideo(t, s).then(() => {
            console.log("Video loaded"),
                loadServers(i, !0).then(() => {
                    console.log("Servers loaded");
                });
        });
    } catch (a) {
        loadServers(i, !1).then(() => {
            console.log("Servers loaded");
        });
    }
}
async function loadData() {
    try {
        await loadEpisodeData(await getJson("/episode/" + EpisodeID));
        let e = (await getJson("/anime/" + AnimeID)).results.episodes;
        getEpUpperList(e), console.log("Episode list loaded");
        try {
            await getEpSlider(e, urlParams.get("episode"));
        } catch {
            (document.getElementById("main-section").style.display = "block"),
                window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
                setTimeout(() => {
                    (document.getElementById("main-section").style.opacity = 1), (document.getElementById("load").style.display = "none");
                }, 100);
        }
        console.log("Episode Slider loaded");
    } catch (t) {
        (document.getElementById("main-section").style.display = "none"), (document.getElementById("error-page").style.display = "block"), (document.getElementById("error-desc").innerHTML = t), console.error(t);
    }
    document.getElementById("LiteStreamFrame").focus();
}
(null == AnimeID || null == EpisodeID) && (window.location = "./index.html"), loadData();

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