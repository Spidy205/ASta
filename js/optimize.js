// Minimize HTTP requests
function combineScripts(scripts) {
    const combinedScript = document.createElement("script");
    combinedScript.type = "text/javascript";
    combinedScript.innerHTML = scripts.join("\n");
    return combinedScript;
  }
  
  // Use asynchronous loading
  function loadAsync(url) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
  }
  
  // Lazy load images
  function lazyLoadImages() {
    const images = document.querySelectorAll("img.lazy-load");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          observer.disconnect(image);
        }
      });
    });
    images.forEach((image) => {
      observer.observe(image);
    });
  }
  
  // Use caching
  function cacheStaticResources() {
    const staticResources = [
      "/styles.css",
      "/logo.png",
      "/icon.png",
      "/background.jpg",
    ];
    staticResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = resource;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }
  
  // Minimize JavaScript
  function loadMinifiedJavaScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
  }
  
  // Use a CDN
  function loadFromCDN(url, callback) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  // Example usage
  cacheStaticResources();
  const scripts = [
    "https://code.jquery.com/jquery-3.6.0.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.min.js",
  ];
  const combinedScript = combineScripts(scripts);
  document.head.appendChild(combinedScript);
  
  const lazyImages = document.querySelectorAll("img.lazy-load");
  lazyLoadImages();
  
  loadAsync("/scripts.js");
  loadMinifiedJavaScript("/minified.js");
  loadFromCDN(
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
    () => {
      // three.js is loaded
    }
  );
  ``