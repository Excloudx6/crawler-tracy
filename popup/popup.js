document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startCrawler");
    const pauseButton = document.getElementById("pauseCrawler");
    const stopButton = document.getElementById("stopCrawler");
  
    startButton.addEventListener("click", function() {
      // Send a message to start the crawler
      chrome.runtime.sendMessage({ type: "startCrawler" });
    });
  
    pauseButton.addEventListener("click", function() {
      // Send a message to pause the crawler
      chrome.runtime.sendMessage({ type: "pauseCrawler" });
    });
  
    stopButton.addEventListener("click", function() {
      // Send a message to stop the crawler
      chrome.runtime.sendMessage({ type: "stopCrawler" });
    });
  });
  