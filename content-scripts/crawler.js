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

function saveUrls() {
  const visitedTx = db.transaction(visitedStoreName, 'readwrite');
  const visitedStore = visitedTx.objectStore(visitedStoreName);
  // Inside the saveUrls function
  visitedUrls.forEach(url => {
    visitedStore.add({ url });
  });



  const queueTx = db.transaction(queueStoreName, 'readwrite');
  const queueStore = queueTx.objectStore(queueStoreName);
 
  urlQueue.forEach(url => {
    queueStore.add({ url });
  }); 
}
function loadUrls() {
  const visitedTx = db.transaction(visitedStoreName, 'readonly');
  const visitedStore = visitedTx.objectStore(visitedStoreName);
  visitedStore.openCursor().onsuccess = event => {
    const cursor = event.target.result;
    if (cursor) {
      visitedUrls.push(cursor.value.url);
      cursor.continue();
    }
  };
  const queueTx = db.transaction(queueStoreName, 'readonly');
  const queueStore = queueTx.objectStore(queueStoreName);

  queueStore.openCursor().onsuccess = event => {
    const cursor = event.target.result;
    if (cursor) {
      urlQueue.push(cursor.value.url);
      cursor.continue();
    }
  };

}
