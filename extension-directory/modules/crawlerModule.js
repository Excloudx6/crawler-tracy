export function initializeCrawlerExtension() {
    let crawlerInterval;
    let isCrawlerPaused = false;
  
    if (!chrome.commands || !chrome.commands.onCommand) {
      console.error("chrome.commands API is not available");
      return;
    }
  
    // Example function representing your crawling logic
    function startCrawling() {
      if (!isCrawlerPaused) {
        // Your crawling code here
        console.log("Crawling...");
      }
    }
  
    // Listen for commands
    chrome.commands.onCommand.addListener(command => {
      if (command === "pause_crawler") {
        isCrawlerPaused = true;
        console.log("Crawler paused");
      } else if (command === "stop_crawler") {
        if (crawlerInterval) {
          clearInterval(crawlerInterval);
          console.log("Crawler stopped");
        }
        isCrawlerPaused = false; // Resetting the pause state after stopping the crawler
      }
    });
  }
  
  // Export the function for usage in background.js
  export { initializeCrawlerExtension };
  