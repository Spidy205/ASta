const express = require('express');
const app = express();
const axios = require('axios');

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://asta-api.sb543267gmailcom.workers.dev/data');
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Original code
function addEventListeners() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        console.log('Button clicked!');
      });
    });
  }
  
  // Minified and compressed code
  function e(t){for(var n=document.querySelectorAll("button"),e=0;e<n.length;e++)n[e].addEventListener("click",function(){console.log("Button clicked!")})}
  // Cache data locally
const cache = {};
function getData(url) {
  if (cache[url]) {
    return cache[url];
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cache[url] = data;
      return data;
    });
}

// Lazy load images
const images = document.querySelectorAll('img.lazy');
images.forEach((image) => {
  image.addEventListener('intersectionObserver', (entries) => {
    if (entries[0].isIntersecting) {
      const src = image.getAttribute('data-src');
      image.src = src;
    }
  });
});

// Debounce a function
function debounce(fn, delay) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  }
  
  // Throttle a function
  function throttle(fn, delay) {
    let timeout;
    return function() {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
        }, delay);
        fn();
      }
    };
  }
  // Split code into smaller modules
import { addEventListeners } from './events';
import { getData } from './data';

addEventListeners();
getData();