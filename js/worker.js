// worker.js
self.onmessage = function(event) {
  const data = event.data;
  // Perform computationally expensive task
  const result = expensiveTask(data);
  self.postMessage(result);
};

self.addEventListener('message', (event) => {
    const data = event.data;
  
    switch (data.type) {
      case 'process':
        const result = heavyComputation(data.payload);
        self.postMessage({ type: 'result', payload: result });
        break;
    }
  });
  
  function heavyComputation(payload) {
    // Add your heavy computation logic here
    // This function should take a significant amount of time to execute
    // and should not block the main thread
  
    let result = 0;
    for (let i = 0; i < payload.length; i++) {
      result += payload[i];
    }
  
    return result;
  }

const worker = new Worker('worker.js');

worker.addEventListener('message', (event) => {
  const data = event.data;

  if (data.type === 'result') {
    console.log('Received result from worker:', data.payload);
  }
});

const payload = Array.from({ length: 1000000 }, (_, i) => i);

worker.postMessage({ type: 'process', payload });