// main.js
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = function(event) {
  const result = event.data;
  // Process result
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('The JavaScript file has been loaded successfully.');
  });