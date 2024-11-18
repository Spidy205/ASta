// caching anime info using lru-cache
const cache = require('lru-cache')({ max: 100 });
async function getAnimeInfo(animeId) {
  const cachedData = cache.get(animeId);
  if (cachedData) {
    return cachedData;
  }
  const data = await fetchAnimeInfo(animeId);
  cache.set(animeId, data);
  return data;
}

// lazy loading video player
const videoPlayer = document.getElementById('video-player');
const videoUrl = 'https://example.com/video.mp4';
videoPlayer.addEventListener('click', () => {
  const video = document.createElement('video');
  video.src = videoUrl;
  videoPlayer.appendChild(video);
  video.play();
});