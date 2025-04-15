import { newProps } from '../press-popup/computed';


export const PRESS_POPUP_CELL_PROPS = [
  'showTitle',
  'closeIcon',
  'arrowIcon',
  'title',
  'button',
  'borderButton',
  'zIndex',
  'popupClass',
  'closeOnClickOverlay',
  'customStyle',
]
  .reduce((acc, key) => {
    acc[key] = newProps[key];
    return acc;
  }, {});
