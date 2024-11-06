fetch('https://asta-api.sb543267gmailcom.workers.dev/')
  .then(response => response.json())
  .then(data => {
    console.log(`Your local IP address is: ${data.ip}`);
  });
const ProxyApi = "64.6.8.5.mtccomm.net/?u=",
    animeapi = "/anime/",
    recommendationsapi = "/recommendations/",
    AvailableServers = ["https://animedexapi.sb543267gmailcom.workers.dev/",
        "https://asta-api.sb543267gmailcom.workers.dev/",
        "https://api3.sb543267gmailcom.workers.dev/",
        "https://api100.sb543267gmailcom.workers.dev/",
        "https://api1.sb543267gmailcom.workers.dev/",
    ];
function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}
async function getJson(e, t = 0) {
    let l = getApiServer(),
        n = l + e;
    if (t > 0) throw `Too many errors while fetching ${n}`;
    t > 0 && (console.log("Retrying fetch using proxy"), (n = " https://proxy11.sb543267gmailcom.workers.dev/?u=" + n));
    try {
        let s = new URL(window.location.href),
            a = s.origin,
            r = await fetch(n, { headers: { referer: a } });
        return await r.json();
    } catch (o) {
        return console.error(o), getJson(e, t + 1);
    }
}
function getGenreHtml(e) {
    let t = "";
    for (let l = 0; l < e.length; l++) t += `<a>${e[l].trim()}</a>`;
    return t;
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
function getAnilistTitle(e) {
    return null != e.userPreferred ? e.userPreferred : null != e.english ? e.english : null != e.romaji ? e.romaji : null != e.native ? e.native : "Unknown";
}
function getAnilistOtherTitle(e, t) {
    return null != e.userPreferred && e.userPreferred != t ? e.userPreferred : null != e.english && e.english != t ? e.english : null != e.romaji && e.romaji != t ? e.romaji : null != e.native && e.native != t ? e.native : "Unknown";
}
async function loadAnimeFromGogo(e) {
    (document.documentElement.innerHTML = document.documentElement.innerHTML
        .replaceAll("TITLE", e.name)
        .replaceAll("IMG", e.image)
        .replaceAll("LANG", "EP " + e.episodes.length)
        .replaceAll("TYPE", e.type)
        .replaceAll("URL", window.location)
        .replaceAll("SYNOPSIS", e.plot_summary)
        .replaceAll("OTHER", e.other_name)
        .replaceAll("TOTAL", e.episodes.length)
        .replaceAll("YEAR", e.released)
        .replaceAll("STATUS", e.status)
        .replaceAll("GENERES", getGenreHtml(e.genre.split(",")))),
        (document.getElementById("main-content").style.display = "block"),
        (document.getElementById("load").style.display = "none"),
        setTimeout(() => {
            document.getElementById("poster-img").style.display = "block";
        }, 100);
    let t = e.episodes;
    0 == t.length
        ? ((document.getElementById("ep-lower-div").innerHTML = '<a id="no-ep-found" class="ep-btn">No Episodes Found</a>'),
          (document.getElementById("ep-divo-outer").style.display = "block"),
          (document.getElementById("ep-upper-div").style.display = "none"),
          (document.getElementById("ep-lower-div").style.gridTemplateColumns = "unset"),
          (document.getElementById("no-ep-found").style.width = "100%"))
        : ((document.getElementById("watch-btn").href = "./episode.html?anime_id=" + AnimeID + "&episode_id=" + e.episodes[0][1]), console.log("Anime Info loaded"), RefreshLazyLoader(), getEpSlider(e.episodes), getEpList(e.episodes)),
        getRecommendations(e.name);
}
async function loadAnimeFromAnilist(e) {
    let t = getAnilistTitle(e.title);
    (document.documentElement.innerHTML = document.documentElement.innerHTML
        .replaceAll("TITLE", t)
        .replaceAll("IMG", e.coverImage.large)
        .replaceAll("LANG", "EP " + e.episodes)
        .replaceAll("TYPE", e.format)
        .replaceAll("URL", window.location)
        .replaceAll("SYNOPSIS", e.description)
        .replaceAll("OTHER", getAnilistOtherTitle(e.title, t))
        .replaceAll("TOTAL", "EP " + e.episodes)
        .replaceAll("YEAR", e.seasonYear)
        .replaceAll("STATUS", e.status)
        .replaceAll("GENERES", getGenreHtml(e.genres))),
        (document.getElementById("main-content").style.display = "block"),
        (document.getElementById("load").style.display = "none"),
        console.log("Anime Info loaded");
    let l = e.recommendations,
        n = "";
    for (i = 0; i < l.length; i++) {
        let s = l[i],
            a = s.title.userPreferred;
        n += `<a href="./anime.html?anime_id=${a}"><div class="poster la-anime"> <div id="shadow1" class="shadow"> <div class="dubb">${s.meanScore} / 100</div><div class="dubb dubb2">${s.format}</div></div><div id="shadow2" class="shadow"> <img class="lzy_img" src="staticSpinner@1x-0.2s-200px-200px.svg" data-src="${s.coverImage.large}"> </div><div class="la-details"> <h3>${a}</h3> <div id="extra"> <span>${s.status}</span> <span class="dot"></span> <span>EP ${s.episodes}</span> </div></div></div></a>`;
    }
    (document.getElementById("latest2").innerHTML = n),
        (document.getElementById("ephtmldiv").innerHTML = '<a class="ep-btn">Anime Name Not Found On GogoAnime, Try Searching With A Different Name...</a>'),
        RefreshLazyLoader(),
        console.log("Anime Recommendations loaded");
}
async function getEpSlider(e) {
    let t = "";
    try {
        for (let l = 0; l < e.length; l++) {
            let n = e[l][1],
                s = e[l][0].replaceAll("-", ".");
            Number(s) > 0 &&
                (t += `<div class=ep-slide><a href="./episode.html?anime_id=${AnimeID}&episode_id=${n}"><img onerror="retryImageLoad(this)" class="lzy_img" src="staticSpinner@1x-0.2s-200px-200px.svg" data-src=><div class=ep-title><span></span></div></a></div>`);
        }
        (document.getElementById("ep-slider").innerHTML = t), (document.getElementById("slider-main").style.display = "box"), RefreshLazyLoader(), console.log("Episode Slider loaded");
    } catch (a) {
        console.error(a);
    }
}
function retryImageLoad(e) {
    let t = e.src;
    (e.src = "staticSpinner@1x-0.2s-200px-200px.svg"),
        setTimeout(() => {
            if (t.includes("?t=")) {
                let l = Number(t.split("?t=")[1]) + 1;
                l < 5 && (e.src = t.split("?t=")[0] + "?t=" + String(l));
            } else e.src = t + "?t=1";
        }, 1e3);
}
let Episode_List = [];
async function getEpList(e) {
    Episode_List = e;
    let t = e.length,
        l = "",
        n = !1;
    for (let s = 0; s < e.length; s++) {
        let a = Number(e[s][0].replaceAll("-", "."));
        if ((a - 1) % 100 == 0) {
            let r;
            t - a < 100
                ? ((l += `<option class="ep-btn" data-from=${a} data-to=${t}>${(r = `${a} - ${t}`)}</option>`), n || (getEpLowerList(a, t), (n = !0)))
                : ((l += `<option class="ep-btn" data-from=${a} data-to=${a + 99}>${(r = `${a} - ${a + 99}`)}</option>`), n || (getEpLowerList(a, a + 99), (n = !0)));
        }
    }
    (document.getElementById("ep-upper-div").innerHTML = l), (document.getElementById("ep-divo-outer").style.display = "block"), console.log("Episode list loaded");
}
async function getEpLowerList(e, t) {
    let l = "",
        n = Episode_List.slice(e - 1, t);
    for (let s = 0; s < n.length; s++) {
        let a = n[s][1],
            r = n[s][1].split("-episode-");
        l += `<a class="ep-btn" href="./episode.html?anime_id=${AnimeID}&episode_id=${a}">${Number(r[1].replaceAll("-", "."))}</a>`;
    }
    document.getElementById("ep-lower-div").innerHTML = l;
}
async function episodeSelectChange(e) {
    var t = e.options[e.selectedIndex];
    getEpLowerList(parseInt(t.getAttribute("data-from")), parseInt(t.getAttribute("data-to")));
}
async function getRecommendations(e) {
    (document.getElementsByClassName("sload")[0].style.display = "center"), (e = e.replaceAll(" ", "+"));
    let t;
    try {
        t = await getJson("/recommendations/" + e);
    } catch (l) {
        document.getElementById("similar-div").style.display = "none";
        return;
    }
    let n = t.results,
        s = "";
    for (i = 0; i < n.length; i++) {
        let a = n[i],
            r = a.title.userPreferred;
        s += `<a href="./anime.html?anime_id=${r}"><div class="poster la-anime"> <div id="shadow1" class="shadow"> <div class="dubb">${a.meanScore} / 100</div><div class="dubb dubb2">${a.format}</div></div><div id="shadow2" class="shadow"> <img class="lzy_img" src="staticSpinner@1x-0.2s-200px-200px.svg" data-src="${a.coverImage.large}"> </div><div class="la-details"> <h3>${r}</h3> <div id="extra"> <span>${a.status}</span> <span class="dot"></span> <span>EP ${a.episodes}</span> </div></div></div></a>`;
    }
    (document.getElementById("latest2").innerHTML = s), (document.getElementsByClassName("sload")[0].style.display = "none"), console.log("Anime Recommendations loaded"), RefreshLazyLoader();
}
const windowWidth = window.innerWidth;
function plusSlides(e) {
    1 === e ? (document.getElementById("slider-carousel").scrollLeft += windowWidth / 2) : -1 === e && (document.getElementById("slider-carousel").scrollLeft -= windowWidth / 2);
}
const queryString = window.location.search,
    urlParams = new URLSearchParams(queryString),
    AnimeID = urlParams.get("anime_id");
async function loadData() {
    try {
        let e = await getJson("/anime/" + AnimeID);
        (e = e.results), "gogoanime" == e.source ? await loadAnimeFromGogo(e) : "anilist" == e.source && (await loadAnimeFromAnilist(e)), RefreshLazyLoader();
    } catch (t) {
        (document.getElementById("error-page").style.display = "block"),
            (document.getElementById("load").style.display = "none"),
            (document.getElementById("main-content").style.display = "none"),
            (document.getElementById("error-desc").innerHTML = t),
            console.error(t);
    }
}
null == AnimeID && (window.location = "./index.html"), loadData();

// LoadJS
loadjs('./js/anime.js', {
    async: true,
    defer: true
  });

  // tinypng.js
const tinypng = require('tinypng');

tinypng.compress('image.jpg', {
  key: 'https://asta-api.sb543267gmailcom.workers.dev/',
  sigFile: 'signature.txt'
}).then(result => {
  console.log(result);
});

    // Make a request to the CORS proxy
    fetch('https://proxy11.sb543267gmailcom.workers.dev/?u=/?u=https://asta-api.sb543267gmailcom.workers.dev/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
