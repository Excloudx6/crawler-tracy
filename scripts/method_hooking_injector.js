(() => {
  // injectScript injects the script into the page and then removes it.
  const injectScript = file => {
    const hookInjector = document.createElement("script");
    hookInjector.type = "text/javascript";
    hookInjector.src = chrome.runtime.getURL(`scripts/${file}`);
    hookInjector.id = "injected";
    document.documentElement.appendChild(hookInjector);
    hookInjector.parentNode.removeChild(hookInjector);
  };
  const injectionScripts = ["query_selector.js", "clickables.js"]; //, "writeables.js"];
  injectionScripts.map(injectScript);
})();
