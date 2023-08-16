(() => {
    // Inject your hooking logic into the page
    const script = document.createElement('script');
    script.type = 'module'; // Add type="module" attribute
    script.src = chrome.extension.getURL('content-scripts/method-hooking/method_hooking_utils.js');
    document.head.appendChild(script);
})();
