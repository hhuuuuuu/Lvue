// /**
//  * 用来拼接new Function(code)的code
//  *
//  * @param {string} childStr
//  * @param {string} parentStr
//  * @param {boolean} isjs = false
//  * @returns {string}
//  */
// function addCode(
//   childStr: string,
//   parentStr: string,
//   isjs: boolean = false
// ): string {
//   const re: RegExp = /(if|for|else|switch|case|break|{|})(.*)?/g;

//   childStr = childStr.trim();

//   return isjs
//     ? childStr.match(re)
//       ? `${parentStr}${childStr};\n`
//       : `${parentStr}r.push(${childStr});\n`
//     : `${parentStr}r.push('${childStr}');\n`;
// }

// /**
//  * 模板引擎
//  *<%for (a of this.ff){%>
//  * <div><% a %> </div>
//  *<%}%>
//  * @param {string} template
//  * @param {any} data
//  * @returns {string}
//  */
// function templateEngine(template: string, data: any): string {
//   const re: RegExp = /<%([^%>]+)?%>/g;
//   let match: any;
//   let code: string = "let r = [];\n";
//   let cursor: number = 0;

//   while ((match = re.exec(template))) {
//     code = addCode(template.slice(cursor, match.index), code);
//     code = addCode(match[1], code, true);
//     cursor = match.index + match[0].length;
//   }

//   code = addCode(template.slice(cursor), code);
//   code = `${code}return r.join('');\n`;

//   const fn: Function = new Function(code);
//   return fn.call(data);
// }
