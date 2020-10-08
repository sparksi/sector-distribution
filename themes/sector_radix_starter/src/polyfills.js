import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.array.find';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// IE support
require('details-element-polyfill',);
require('intersection-observer',);
