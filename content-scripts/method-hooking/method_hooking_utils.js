// content-scripts/method-hooking/method_hooking_utils.js
// This script contains utility functions for method hooking

// Define your utility functions and method hooking logic here

// Example utility function
function logMethodCall(target, methodName, args) {
    console.log(`Calling method ${methodName} on`, target);
    console.log('Arguments:', args);
  }
  
  // Example method hooking
  (function () {
    const originalAddEventListener = Node.prototype.addEventListener;
    Node.prototype.addEventListener = function (type, listener, options) {
      const args = [type, listener, options];
      logMethodCall(this, 'addEventListener', args);
      return originalAddEventListener.apply(this, args);
    };
  })();
  