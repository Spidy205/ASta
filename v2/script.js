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

