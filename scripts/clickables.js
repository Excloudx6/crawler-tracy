(() => {

  // domainMatches checks if a string matches the current domain.
  const domainMatches = href => {
    return href
      .toLowerCase()
      .startsWith(
        window.location.protocol.toLowerCase() +
          "//" +
          window.location.hostname.toLowerCase()
      );
  };
  // getLoadedClickables returns a list of DOM nodes
  // that have already been loaded into the page and are clickable.
  // This won't catch things like events registered with event listeners.
  const getLoadedClickables = () => [
    ...document.querySelectorAll("input[type='submit']"),
    ...document.querySelectorAll("button"),
    ...document.querySelectorAll("[onclick]"),
    ...[...document.querySelectorAll("a")].filter(node =>
      domainMatches(node.href)
    )
  ];

  // hookNewClickables uses a mutation observer to watch for
  // changes to the DOM that would introduce something that can
  // be clicked.
  const hookNewClickables = allClickables => {
    hookAddClickEventListener(allClickables);
    hookOnclickProperty(allClickables);
  };

  // hookExistingClickables looks at the page after it has loaded
  // and tries to get loaded clickables that might have been missed
  // by the mutation observer. This will likely create duplicates,
  // so we may want to get rid of it.
  const hookExistingClickables = allClickables =>
    window.addEventListener("load", () => {
      allClickables.push.apply(
        allClickables,
        getLoadedClickables().map(querySelector.fromDOMNode)
      );
    });

  // hookAddClickEventListener overrides the Node prototye
  //`addEventListener`method and stores a reference to the
  // DOM node.
  const hookAddClickEventListener = allClickables => {
    Node.prototype.addEventListener = new Proxy(
      Node.prototype.addEventListener,
      {
        apply: (target, thisArg, argumentsList) => {
          allClickables.push(querySelector.fromDOMNode(thisArg));
          Reflect.apply(target, thisArg, argumentsList);
        }
      }
    );
  };

  // hookOnclickProperty overrides the HTMLElement prototype to add an
  // onclick property so that we can hook any element that tries to set
  // the property manually. It stores a reference to the DOM node.
  const hookOnclickProperty = allClickables => {
    HTMLElement.prototype._onclick = () => console.log("default");
    Object.defineProperty(HTMLElement.prototype, "onclick", {
      get() {
        return this._onclick;
      },
      set(value) {
        allClickables.push(querySelector.fromDOMNode(this));
        this._onclick = value;
      }
    });
  };

  let c = [];
  hookNewClickables(c);
  hookExistingClickables(c);
  window.addEventListener("load", () => {
    setInterval(() => {
      if (c.length === 0) return;
      const data = JSON.stringify({ clickables: c });
      c.length = 0;
      window.postMessage(data, "*");
    }, 500);
  });
})();
