"use strict";

const querySelector = (() => {
  /**
   * Takes original target node and walks up tree and collects path
   * @param {dom object} origin - needle in the haystack (dom tree) we start at
   */

  const walkUp = (origin, el, path = []) => {
    let target = el || origin;
    let position = walkLeft(target);
    let node = {
      name: target.nodeName.toLowerCase(),
      nthType: position.type,
      nthChild: position.child
    };
    if (target.attributes) {
      if (target.attributes.length > 0) {
        node.attrs = {};
        [].slice.call(target.attributes).forEach(attr => {
          node.attrs[attr.name] = attr.value;
        });
      }
    }
    if (target.parentNode) {
      path.unshift(node);
      return walkUp(origin, target.parentNode, path);
    } else {
      return path;
    }
  };

  /**
   * Takes node and walks left in list of sibling nodes to get nth-type-of and nth-child positions, which starts at 1, not 0.
   * @param {dom object} node
   */

  const walkLeft = node => {
    return !node.parentNode
      ? 0
      : [].slice.call(node.parentNode.childNodes || []).reduce(
          (acc, el) => {
            if (el === node) {
              acc.hasPosition = true;
            }
            if (acc.hasPosition === false) {
              acc.position.child++;
              if (el.nodeName === node.nodeName) {
                acc.position.type++;
              }
            }
            return acc;
          },
          { position: { type: 1, child: 1 }, hasPosition: false }
        ).position;
  };

  return {
    fromDOMNode: node =>
      walkUp(node).reduce(
        (accum, cur) =>
          `${accum ? accum + " > " : accum}${cur.name}:nth-of-type(${
            cur.nthType
          })`,
        ""
      )
  };
})();
