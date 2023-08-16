function initializeCrawlerExtension() {
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
  
  // Call the initialization function when the extension is loaded
  initializeCrawlerExtension();
 // Listen for changes in input fields and update them with Tracer payloads

   

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "inputChange") {
      // Log the received message
      console.log("Received message from content script:", message);
  
      // Process the message and call addDOMJob here
      // ...
    }
  });