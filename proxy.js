const https = require('https');

const proxyServer = 'https://proxy11.sb543267gmailcom.workers.dev/?u=';
const targetUrl = 'https://lite-stream.vercel.app/';

https.get(targetUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.error(err);
});

const requestOptions = {
  hostname: targetUrl,
  port: 443,
  path: '/',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
  }
};

const proxyRequest = https.request(proxyServer, (proxyRes) => {
  let data = '';

  proxyRes.on('data', (chunk) => {
    data += chunk;
  });

  proxyRes.on('end', () => {
    console.log(data);
  });
});

proxyRequest.on('error', (err) => {
  console.error(err);
});

proxyRequest.end();