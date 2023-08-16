chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "startCrawler") {
      startCrawler();
    } else if (message.type === "stopCrawler") {
      stopCrawler();
    }
  });
  
  let crawlerInterval;
  let isCrawlerPaused = false;
  
  // Example function representing your crawling logic
  function startCrawling() {
    if (!isCrawlerPaused) {
      // Your crawling code here
      console.log("Crawling...");
    }
  }
  
  function stopCrawling() {
    if (crawlerInterval) {
      clearInterval(crawlerInterval);
      console.log("Crawler stopped");
    }
    isCrawlerPaused = false; // Resetting the pause state after stopping the crawler
  }
  