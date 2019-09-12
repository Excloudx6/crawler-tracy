let clickables = (() => {
  let clickables = [];
  // Code to hook the onclick addEventListener function call.
  Node.prototype.addEventListener = new Proxy(Node.prototype.addEventListener, {
    apply: (target, thisArg, argumentsList) => {
      console.log("addEventListener called!", target, thisArg, argumentsList);
      clickables = [...clickables, thisArg];
      Reflect.apply(target, thisArg, argumentsList);
    }
  });

  // Code to hook the setters of the onclick attribute.
  HTMLElement.prototype._onclick = () => console.log("default");
  Object.defineProperty(HTMLElement.prototype, "onclick", {
    get() {
      return this._onclick;
    },
    set(value) {
      console.log("setting onclick handler!", this, value);
      clickables = [...clickables, this];
      this._onclick = value;
    }
  });

  // Code to hook any inline onclick handlers or new nodes with click
  // handlers added to them.
  const observerConfig = {
    attributes: true,
    childList: true,
    characterData: true,
    characterDataOldValue: true,
    subtree: true
  };
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        const added_onclicks = [...mutation.addedNodes]
          .map(node => {
            if (node.attributes) {
              return [...node.attributes];
            }
            return [];
          })
          .flat()
          .filter(attr => attr.name === "onclick");
        if (added_onclicks.length > 0) {
          console.log("added onclick node!", added_onclicks);
          clickables = [...clickables, ...added_onclicks];
        }

        mutation.addedNodes.forEach(node => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.nodeName.toLowerCase() === "a" &&
            node.href
              .toLowerCase()
              .startsWith(
                window.location.protocol.toLowerCase() +
                  "//" +
                  window.location.hostname.toLowerCase()
              )
          ) {
            console.log("added an anchor node!", node);
            clickables = [...clickables, node];
          }
        });
      }
      if (mutation.type === "attributes") {
        const attribute_change_onclicks = [
          ...mutation.target.attributes
        ].filter(a => a.name === "onclick");
        if (attribute_change_onclicks.length > 0) {
          console.log("modified onclick attribute!", attribute_change_onclicks);
          clickables = [...clickables, ...attribute_change_onclicks];
        }
      }

      if (mutation.attributeName === "onclick") {
        console.log("modified onclick attribute!", mutation);
      }
    });
  });

  observer.observe(document.documentElement, observerConfig);

  // Code to handle links to the same app. We don't care about links
  // that take us away from the app.

  return {
    // Every time we get the clickables, dedupe and remove any DOM
    // nodes that aren't a part of the page anymore.
    get: () => {
      clickables = [...new Set(clickables)].filter(c =>
        document.body.contains(c)
      );
      return clickables;
    }
  };
})();
