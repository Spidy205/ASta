// Minify JavaScript
function init() {
  // Code to initialize the page
}

// Use a library like Gzip to compress JavaScript files
// or use a bundler like Webpack to optimize code

// Leverage browser caching for JavaScript files
const cacheVersion = '1.0.0';
document.addEventListener('DOMContentLoaded', function() {
  init();
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
  function getLocalIP() {
    return new Promise(resolve => {
      const rtc = new RTCPeerConnection();
      rtc.createDataChannel('');
      rtc.createOffer().then(offer => {
        return rtc.setLocalDescription(new RTCSessionDescription({ type: 'offer', sdp: offer.sdp }));
      }).then(() => {
        const lines = rtc.localDescription.sdp.split('\n');
        const ips = lines.filter(line => line.indexOf('candidate:') === 0);
        const localIP = ips[0].split(' ')[4];
        resolve(localIP);
      });
    });
  }
  
  getLocalIP().then(ip => {
    document.getElementById('ip-address').textContent = `Your local IP address is: ${ip}`;
  });

