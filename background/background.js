import { saveUrls, loadUrls } from './database';

let isCrawlerPaused = false;

// Add the IndexedDB initialization code here
const dbName = 'CrawlerDB';
const visitedStoreName = 'visitedUrls';
const queueStoreName = 'urlQueue';

let db;

// Initialize IndexedDB
const request = indexedDB.open(dbName, 1);
request.onupgradeneeded = event => {
  db = event.target.result;
  db.createObjectStore(visitedStoreName, { keyPath: 'url' });
  db.createObjectStore(queueStoreName, { keyPath: 'url' });
};
request.onsuccess = event => {
  db = event.target.result;
};
request.onerror = event => {
  console.error('Error opening IndexedDB:', event.target.errorCode);
};

// Example function representing your crawling logic
function startCrawling() {
  // Load URLs from IndexedDB
  loadUrls();

  // Start the crawling process
  crawlNext();
}
function loadUrls() {
  // Logic to load URLs from IndexedDB
  // ...
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
