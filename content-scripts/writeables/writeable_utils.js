export function isInputNode(node) {
    return (
      node.nodeName.toLowerCase() === 'input' &&
      node.type.toLowerCase() !== 'hidden' &&
      node.type.toLowerCase() !== 'submit'
    );
  }
  
  export function isTextArea(node) {
    return node.nodeName.toLowerCase() === 'textarea';
  }
  