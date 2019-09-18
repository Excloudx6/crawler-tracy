var writeables = (() => {
  let writeables = [];

  const observerConfig = {
    childList: true
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        writeables = [
          ...writeables,
          ...[...mutation.addedNodes].filter(node => node.nodeName === "input")
        ];
      }
    });
  });

  observer.observe(document.documentElement, observerConfig);

  return {
    get: () => writeables
  };
})();
