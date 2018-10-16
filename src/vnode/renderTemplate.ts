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
 * 用来拼接new Function(code)的code
 *
 * @param {string} childStr
 * @param {string} parentStr
 * @param {boolean} isjs = false
 * @returns {string}
 */
function addCode(
  childStr: string,
  parentStr: string,
  isjs: boolean = false
): string {
  const re: RegExp = /(if|for|else|switch|case|break|{|})(.*)?/g;

  childStr = childStr.trim();

  return isjs
    ? childStr.match(re)
      ? `${parentStr}${childStr};\n`
      : `${parentStr}r.push(${childStr});\n`
    : `${parentStr}r.push('${childStr}');\n`;
}

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

/**
 * 模板引擎
 *
 * @param {string} template
 * @param {any} data
 * @returns {string}
 */
function templateEngine(template: string, data: any): any {
  console.log(toAst(template));
}

const root: Array<object> = [];
let parent: any = null;
const tagConfig = {
  ifTag: /^if\s+([\s\S]+)$/
};

function getTagContent(str: string): object {
  let matchs;
  if ((matchs = str.match(tagConfig.ifTag))) {
    return {
      tag: "if",
      item: matchs[1]
    };
  }
  return null;
}

function toAst(template: string): any {
  const matches = template.match(/{{|{%/);
  if (!matches) {
    //获取文本节点
    const domString = template.trim();
    if (domString) {
      (parent ? parent.children : root).push({
        type: 1,
        text: domString
      });
    }
    return;
  }
  const isBlock = matches[0] === "{%"; //是否为块级节点 for之类的
  let endIndex = matches.index;

  //获取文本节点
  const domString = template.slice(0, endIndex).trim();
  if (domString) {
    (parent ? parent.children : root).push({
      type: 1,
      text: domString
    });
  }

  //获取js节点
  endIndex = endIndex + 2;
  template = template.slice(endIndex);
  const end = isBlock ? "%}" : "}}";
  const rightIndex = template.indexOf(end);
  const jsString: string = template.slice(0, rightIndex).trim();
  endIndex = rightIndex + 2;

  template = template.slice(endIndex);

  if (isBlock) {
    let content = getTagContent(jsString);
    if (content) {
      content = {
        ...content,
        type: 2,
        children: []
      };
      (parent ? parent.children : root).push(content);
      parent = content;
      toAst(template);
    } else {
      parent = parent.parent;
      toAst(template);
    }
  } else {
    (parent ? parent.children : root).push({
      type: 3,
      item: jsString
    });
    toAst(template);
  }
  return root;
}
