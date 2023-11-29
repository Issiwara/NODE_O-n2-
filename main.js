const express = require('express');
const app = express();
const port = 3000;

// Simulate an asynchronous data fetching operation
async function fetchData(size) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = Array.from({ length: size }, () => Math.floor(Math.random() * 100000));
      resolve(data);
    }, 1000);
  });
}

// Bubble Sort algorithm
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap if the element found is greater than the next element
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

app.get('/', async (req, res) => {
  const dataSize = 15000;
  const data = await fetchData(dataSize);

  // Create a copy of the data to avoid modifying the original array
  const unsortedData = [...data];
  
  // Sort the data using Bubble Sort
  const sortedData = bubbleSort(unsortedData);

  // Send both unsorted and sorted data as a response
  res.send(`

    <h1>Sorted Data:</h1>
    <p>${sortedData.join(', ')}</p>
  `);
});

app.listen(port, () => {
  console.log(`Bubble Sort app listening at http://localhost:${port}`);
});
