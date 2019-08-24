import * as R from 'ramda';
import {singleClassCSS} from '@pkg/fast-stylesheet';

export const MAGIC_LAYER_TAG = 'canvas-html-wrapper';

const appendCanvasHTMLNode = canvas => (
  {
    tag,
    children,
    css,
    className,
  },
) => {
  let {parentNode} = canvas;

  // create relative container if not present
  if (parentNode.tagName !== MAGIC_LAYER_TAG) {
    const canvasHTMLWrapper = document.createElement(MAGIC_LAYER_TAG);

    canvasHTMLWrapper.className = singleClassCSS(
      {
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
      },
    ).className;

    parentNode.insertBefore(canvasHTMLWrapper, canvas);
    canvasHTMLWrapper.appendChild(canvas);

    parentNode = canvasHTMLWrapper;
  }

  // append elements
  const node = document.createElement(tag);
  node.innerHTML = children;

  if (className)
    node.classList.add(className);

  if (css) {
    const sheet = singleClassCSS(css);

    node.classList.add(...R.split(' ', sheet.className));
    node.addEventListener('DOMNodeRemoved', () => {
      sheet.remove();
    });
  }

  parentNode.appendChild(node);
  return node;
};

export default appendCanvasHTMLNode;
