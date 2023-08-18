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

function saveUrls(visitedUrls, urlQueue) {
  // Logic to save URLs to IndexedDB
}

function loadUrls() {
  // Logic to load URLs from IndexedDB
}

export { saveUrls, loadUrls };
