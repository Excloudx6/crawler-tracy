(() => {
  // hookDOM creates a mutation observer to watch for new clickables that get
  // loaded on the page and stores references to those DOM nodes as query
  // selector strings. This includes things like inline click handlers via DOM
  // attributes, links, and input fields.
  const hookDOM = () => {
    const checkInlineOnclickAttrAdded = node => {
      const onclickAttrs = [...node.attributes].filter(
        attr => attr.name === "onclick"
      );
      if (onclickAttrs.length > 0) {
        return node;
      }
    };

    const checkIsAnchorToSameDomain = node => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.nodeName.toLowerCase() === "a" &&
        domainMatches(node.href)
      ) {
        return node;
      }
    };

    const checkIsButton = node => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.nodeName.toLowerCase() === "button"
      ) {
        return node;
      }
    };

    const checkIsInputSubmit = node => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.nodeName.toLowerCase() === "input" &&
        node.type.toLowerCase() === "submit"
      ) {
        return node;
      }
    };

    const checkIsNewClickableNode = mutation => {
      if (mutation.type !== "childList") {
        return [];
      }

      return [...mutation.addedNodes].filter(node => {
        checkInlineOnclickAttrAdded(node) ||
          checkIsAnchorToSameDomain(node) ||
          checkIsButton(node) ||
          checkIsInputSubmit(node);
      });
    };
    const checkHasNewClickableAttributes = mutation => {
      if (mutation.type !== "attributes") {
        return [];
      }
      if (mutation.attributeName === "onclick") {
        return [mutation.target];
      }

      return [];
    };

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        driver.addClickables([
          ...checkIsNewClickableNode(mutation).map(querySelector.fromDOMNode),
          ...checkHasNewClickableAttributes(mutation).map(
            querySelector.fromDOMNode
          )
        ]);
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      characterData: true,
      characterDataOldValue: true,
      subtree: true
    });
  };
})();
