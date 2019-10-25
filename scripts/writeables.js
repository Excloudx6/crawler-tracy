var writeables = (() => {
  const observerConfig = {
    childList: true,
    subtree: true
  };

  const isInputNode = node =>
    node.nodeName.toLowerCase() === "input" &&
    node.type.toLowerCase() !== "hidden" &&
    node.type.toLowerCase() !== "submit";
  const isTextArea = node => node.nodeName.toLowerCase() === "textarea";
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        [...mutation.addedNodes]
          .filter(node => isInputNode(node) || isTextArea(node))
          .map(node => (node.value = "zzXSSzz"));
      }
    });
  });

  observer.observe(document.documentElement, observerConfig);

  return {
    get: () => writeables
  };
})();
