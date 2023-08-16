import { addClickables } from './clickable_driver.js';
import { querySelectorFromDOMNode } from './query_selector.js';

(() => {
    const hookDOM = () => {
        const domainMatches = href => {
            return href
                .toLowerCase()
                .startsWith(
                    window.location.protocol.toLowerCase() +
                    "//" +
                    window.location.hostname.toLowerCase()
                );
        };

        const checkInlineOnclickAttrAdded = node => {
            if (!node.attributes) return;
            const onclickAttrs = Array.from(node.attributes).filter(
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
                return (
                    checkInlineOnclickAttrAdded(node) ||
                    checkIsAnchorToSameDomain(node) ||
                    checkIsButton(node) ||
                    checkIsInputSubmit(node)
                );
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
                addClickables([
                    ...checkIsNewClickableNode(mutation).map(querySelectorFromDOMNode),
                    ...checkHasNewClickableAttributes(mutation).map(
                        querySelectorFromDOMNode
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

    hookDOM();
})();

export { addClickables };
