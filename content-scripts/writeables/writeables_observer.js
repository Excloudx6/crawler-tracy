
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
          .forEach(node => {
            node.value = payload; // Fill the input field
        
            // Find the parent form and submit it
            let parent = node.parentNode;
            while (parent && parent.nodeName.toLowerCase() !== 'form') {
              parent = parent.parentNode;
            }
            if (parent) {
              parent.submit();
            }
          });
      }
    });
  });

  observer.observe(document.documentElement, observerConfig);
}
