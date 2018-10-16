/**
 *
 * @export
 * @param {*} options
 */
export function createElement(options: any): Element {
  const { tagName, attrs } = options;
  const $el = document.createElement(tagName);
  Object.keys(attrs).forEach(key => {
    $el[key] = attrs[key];
  });
  $el.innerText = attrs.innerText;
  return $el;
}
