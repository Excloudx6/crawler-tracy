
export function setupObserver() {
  const observerConfig = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const payload = 'zzXSSzz'; // Tracer payload

        // Send a message to the background.js listener
        chrome.runtime.sendMessage({ type: 'inputChange', payload });

        [...mutation.addedNodes]
          .filter(node => isInputNode(node) || isTextArea(node))
          .map(node => (node.value = payload));
      }
    });
  });

  observer.observe(document.documentElement, observerConfig);
}
