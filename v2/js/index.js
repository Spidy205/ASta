fetch('https://asta-api.sb543267gmailcom.workers.dev/')
  .then(response => response.json())
  .then(data => {
    console.log(`Your local IP address is: ${data.ip}`);
  });
const ProxyApi = "64.6.8.5.mtccomm.net/?u=",
    IndexApi = "/home",
    recentapi = "/recent/",
    AvailableServers = [
        "https://asta-api.sb543267gmailcom.workers.dev/",
        "https://api3.sb543267gmailcom.workers.dev/",
        "https://api100.sb543267gmailcom.workers.dev/",
        "https://api1.sb543267gmailcom.workers.dev/",
    ];
function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}
async function getJson(e, s = 0) {
    let i = getApiServer(),
        a = i + e;
    if (s > 0) throw `Too many errors while fetching ${a}`;
    s > 0 && (console.log("Retrying fetch using proxy"), (a = " https://proxy11.sb543267gmailcom.workers.dev/?u=" + a));
    try {
        let l = new URL(window.location.href),
            t = l.origin,
            n = await fetch(a, { headers: { referer: t } });
        return await n.json();
    } catch (r) {
        return console.error(r), getJson(e, s + 1);
    }
}
function genresToString(e) {
    return e.join(", ");
}
function shuffle(e) {
    let s = e.length,
        i;
    for (; s > 0; ) (i = Math.floor(Math.random() * s)), s--, ([e[s], e[i]] = [e[i], e[s]]);
    return e;
}
async function getTrendingAnimes(e) {
    let s = "";
    for (let i = 1; i < e.length; i++) {
        let a = e[i],
            l = a.title.userPreferred,
            t = a.format,
            n = a.status,
            r = genresToString(a.genres),
            o = a.description,
            d = "./anime.html?anime_id=" + encodeURIComponent(l),
            c = a.poster;
        null == c && (c = a.coverImage.extraLarge),
            (s += `<div class="mySlides fade"> <div class="data-slider"> <p class="spotlight">#${
                i + 2
            } Spotlight</p><h1>${l}</h1> <div class="extra1"> <span class="year"><i class="fa fa-play-circle"></i>${t}</span> <span class="year year2"><i class="fa fa-calendar"></i>${n}</span> <span class="cbox cbox1">${r}</span> <span class="cbox cbox2">HD</span> </div><p class="small-synop">${o}</p><div id="watch"> <a href="${d}" class="watch-btn"> <i class="fa fa-play-circle"></i> Watch Now </a> <a href="${d}" class="watch-btn watch-btn2"> <i class="fa fa-info-circle"></i> Details<i class="fa fa-angle-center"></i> </a> </div></div><div class="shado"> <a href="${d}"></a> </div><img src="${c}"> </div>`);
    }
    document.querySelector(".slideshow-container").innerHTML = s + '<a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a>';
}
async function getPopularAnimes(e) {
    let s = "";
    for (let i = 0; i < e.length; i++) {
        let a = e[i],
            l = a.title,
            t = "./anime.html?anime_id=" + a.id,
            n,
            r;
        s += `<a href="${t}"><div class="poster la-anime"> <div id="shadow1" class="shadow"><div class="dubb"># ${i + 1}</div> <div class="dubb dubb2">${(r = l.toLowerCase().includes("dub")
            ? "DUB"
            : "SUB")}</div> </div><div id="shadow2" class="shadow"> <img class="lzy_img" src="staticSpinner@1x-0.2s-200px-200px.svg" data-src="${a.image}"> </div><div class="la-details"> <h3>${l}</h3></div></div></a>`;
    }
    document.querySelector(".popularg").innerHTML = s;
}
async function getRecentAnimes(e = 1) {
    let s = (await getJson("/recent/" + e)).results,
        i = "";
    for (let a = 0; a < s.length; a++) {
        let l = s[a],
            t = l.title,
            n = "./anime.html?anime_id=" + l.id.split("-episode-")[0],
            r = l.image,
            o,
            d;
        i += `<a href="${n}"><div class="poster la-anime"> <div id="shadow1" class="shadow"><div class="dubb">${(d = t.toLowerCase().includes("dub") ? "DUB" : "SUB")}</div><div class="dubb dubb2">EP ${
            l.episode.split(" ")[1]
        }</div> </div><div id="shadow2" class="shadow"> <img class="lzy_img" src="staticSpinner@1x-0.2s-200px-200px.svg" data-src="${r}"> </div><div class="la-details"> <h3>${t}</h3></div></div></a>`;
    }
    document.querySelector(".recento").innerHTML += i;
}
let slideIndex = 0,
    clickes = 0;
function showSlides(e) {
    let s,
        i = document.getElementsByClassName("mySlides");
    for (e > i.length && (slideIndex = 1), e < 1 && (slideIndex = i.length), s = 0; s < i.length; s++) i[s].style.display = "none";
    i[slideIndex - 1].style.display = "flex";
}
async function showSlides2() {
    1 == clickes && (await sleep(3e3), (clickes = 0));
    let e,
        s = document.getElementsByClassName("mySlides");
    for (e = 0; e < s.length; e++) s[e].style.display = "none";
    ++slideIndex > s.length && (slideIndex = 1), (s[slideIndex - 1].style.display = "flex"), setTimeout(showSlides2, 1e4);
}
function plusSlides(e) {
    showSlides((slideIndex += e)), (clickes = 1);
}
function currentSlide(e) {
    showSlides((slideIndex = e)), (clickes = 1);
}
async function RefreshLazyLoader() {
    let e = new IntersectionObserver((e, s) => {
            e.forEach((e) => {
                if (e.isIntersecting) {
                    let s = e.target;
                    s.src = s.dataset.src;
                }
            });
        }),
        s = document.querySelectorAll("img.lzy_img");
    s.forEach((s) => {
        e.observe(s);
    });
}
function sleep(e) {
    return new Promise((s) => setTimeout(s, e));
}
let page = 2,
    isLoading = !1;
async function loadAnimes() {
    try {
        !1 == isLoading && ((isLoading = !0), await getRecentAnimes(page), RefreshLazyLoader(), console.log("Anime fetching from Another server"), (page += 1), (isLoading = !1));
    } catch (e) {
        (isLoading = !1), console.error(`Failed To Load Recent Animes Page : ${page}`), (page += 1);
    }
}
window.addEventListener("scroll", function () {
    let e = window.scrollY,
        s = window.innerHeight,
        i = document.documentElement.scrollHeight;
    e + 4 * s >= i && loadAnimes();
}),
    getJson("/home").then((e) => {
        e = e.results;
        let s = shuffle(e.anilistTrending),
            i = shuffle(e.gogoPopular);
        getTrendingAnimes(s).then((e) => {
            RefreshLazyLoader(), showSlides(slideIndex), showSlides2(), console.log("Sliders loaded");
        }),
            getPopularAnimes(i).then((e) => {
                RefreshLazyLoader(), console.log("Popular animes loaded");
            }),
            getRecentAnimes(1).then((e) => {
                RefreshLazyLoader(), console.log("Anime fetching from Another server");
            });
    }),
    document.querySelector(".close-popup").addEventListener("click", function () {
        document.querySelector(".popup-container").style.display = "none";
    });

    // Make a request to the CORS proxy
fetch('https://proxy11.sb543267gmailcom.workers.dev/?u=/?u=https://asta-api.sb543267gmailcom.workers.dev/api/data')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

// Gulpfile.js
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('minify-js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('js'));
});

// LoadJS
loadjs('./js/index.js', {
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

// Add an event listener to the window load event
window.addEventListener('load', () => {
    // Get the preloader element
    const preloader = document.getElementById('preloader');
  
    // Add a timeout to delay the removal of the preloader
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 2000); // 2 seconds
  });
