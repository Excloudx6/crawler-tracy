import { saveUrls, loadUrls } from './database';

let isCrawlerPaused = false;

// Example function representing your crawling logic
function startCrawling() {
  // Load URLs from IndexedDB
  loadUrls();

  // Start the crawling process
  crawlNext();
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
