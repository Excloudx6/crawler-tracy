import { addClickables } from './clickable_driver.js';
import { querySelectorFromDOMNode } from './query_selector.js';

(() => {
    const domainMatches = href => {
        return href
            .toLowerCase()
            .startsWith(
                window.location.protocol.toLowerCase() +
                "//" +
                window.location.hostname.toLowerCase()
            );
    };

    const getLoadedClickables = () => [
        ...document.querySelectorAll("input[type='submit']"),
        ...document.querySelectorAll("button"),
        ...document.querySelectorAll("[onclick]"),
        ...[...document.querySelectorAll("a")].filter(node =>
            domainMatches(node.href)
        )
    ];

    const hookNewClickables = allClickables => {
        hookAddClickEventListener(allClickables);
        hookOnclickProperty(allClickables);
    };

    const hookExistingClickables = allClickables =>
        window.addEventListener("load", () => {
            allClickables.push.apply(
                allClickables,
                getLoadedClickables().map(querySelectorFromDOMNode)
            );
        });

    const hookAddClickEventListener = allClickables => {
        Node.prototype.addEventListener = new Proxy(
            Node.prototype.addEventListener,
            {
                apply: (target, thisArg, argumentsList) => {
                    allClickables.push(querySelectorFromDOMNode(thisArg));
                    Reflect.apply(target, thisArg, argumentsList);
                }
            }
        );
    };

    const hookOnclickProperty = allClickables => {
        HTMLElement.prototype._onclick = () => console.log("default");
        Object.defineProperty(HTMLElement.prototype, "onclick", {
            get() {
                return this._onclick;
            },
            set(value) {
                allClickables.push(querySelectorFromDOMNode(this));
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

// Example usage
const newClickables = [...]; // New clickables discovered
addClickables(newClickables);
