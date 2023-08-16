// scripts/method_hooking_injector.js
(() => {
  const injectScript = file => {
    const hookInjector = document.createElement("script");
    hookInjector.type = "text/javascript";
    hookInjector.src = chrome.runtime.getURL(`scripts/${file}`);
    hookInjector.id = "injected";
    document.documentElement.appendChild(hookInjector);
    hookInjector.parentNode.removeChild(hookInjector);
  };

  const injectionScripts = ["query_selector.js", "clickables.js", "clickable_observer.js"];
  injectionScripts.map(injectScript);
})();
