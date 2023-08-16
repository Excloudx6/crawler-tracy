export function initializeCrawlerExtension() {
  // Crawler state variables
  let crawlerInterval;
  let isCrawlerPaused = false;
  let visitedUrls = new Set(); // To keep track of visited URLs
  let urlQueue = []; // Queue of URLs to visit
  
  function fillInputFields() {
    // Your logic to fill input fields here
    // ...
  }
  
  function startCrawling() {
    if (!isCrawlerPaused) {
      console.log("Crawling...");
  
      // Check if there are any input fields on the current page to fill
      const inputFields = document.querySelectorAll("input[type='text'], textarea");
      const unfilledFields = [...inputFields].filter(field => !field.value);
  
      if (unfilledFields.length > 0) {
        fillInputFields();
      } else {
        clickAroundAndCollectUrls();
      }
    }
  }
  
  function clickAroundAndCollectUrls() {
    // Your logic for clicking around and collecting URLs here
    // For example, simulate clicking a link and adding the URL to the queue
    // const links = document.querySelectorAll("a");
    // for (const link of links) {
    //   const url = link.href;
    //   if (url && !visitedUrls.has(url) && !urlQueue.includes(url)) {
    //     urlQueue.push(url);
    //   }
    // }
  }
  
  function stopCrawling() {
    if (crawlerInterval) {
      clearInterval(crawlerInterval);
      console.log("Crawler stopped");
    }
    isCrawlerPaused = false; // Resetting the pause state after stopping the crawler
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "startCrawler") {
      startCrawling();
    } else if (message.type === "stopCrawler") {
      stopCrawling();
    }
  });
}
