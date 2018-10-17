import parse from "./parse";

/**
 *
 * @export
 * @param {*} template
 * @returns {string}
 */
export default function(template: string): string {
  return templateEngine(template, this);
}

/**
 * 模板引擎
 *
 * @param {string} template
 * @param {any} data
 * @returns {string}
 */
function templateEngine(template: string, data: any): any {
  return parse(template, data);
}
