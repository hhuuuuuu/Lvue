//AST 结构[
// {
//   type: 1, //文本节点
//     text: '<div>'
// },
// {
//   type: 2,  逻辑节点
//     tag: 'if',
//       item: 'test > 1',
//         children: [{
//           type: 3, //表达式节点
//           item: 'test'
//         }]
// },
// {
//   type: 1,
//     text: '</div>'
// }
// ]

const tagre: RegExp = /^(if|for|else if|else)\s*([\s\S]*)$/;

const elseList = ["else if", "else"];

function getTagContent(str: string): object {
  const matchs = str.match(tagre);
  return matchs
    ? {
        tag: matchs[1],
        item: matchs[2],
        isElse: elseList.indexOf(matchs[1]) > -1
      }
    : null;
}

function toAst(template: string, root: any, parent: any): any {
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
    let content: any = getTagContent(jsString);
    if (content) {
      //如果else if 或者else
      if (content.isElse) {
        parent = parent.parent;
      }
      content = {
        ...content,
        type: 2,
        children: [],
        parent: parent
      };
      (parent ? parent.children : root).push(content);
      parent = content;
      toAst(template, root, parent);
    } else {
      parent = parent.parent;
      toAst(template, root, parent);
    }
  } else {
    (parent ? parent.children : root).push({
      type: 3,
      item: jsString
    });
    toAst(template, root, parent);
  }
  return root;
}

function parseTree(tree: any, root: boolean) {
  let str = root ? "let arr = []; \n" : "";
  for (const item of tree) {
    const { type, text, tag, item: content, children } = item;
    if (type === 1) {
      str = `${str}arr.push('${text.replace(/\n/g, "")}'); \n`;
    }
    if (type === 2) {
      str = content
        ? `${str}${tag}(${content}){\n${parseTree(children, false)}} \n`
        : `${str}${tag}${content}{\n${parseTree(children, false)}} \n`;
    }
    if (type === 3) {
      str = `${str}arr.push(${content});\n`;
    }
  }
  return root ? `${str}return arr.join('')` : str;
}

function createParseFn(tree: Array<any>) {
  const code = parseTree(tree, true);
  const fn = new Function("data", `with(data){\n${code}\n}`);
  return fn;
}

export default function parse(template: string, data: any): any {
  const root: Array<object> = [];
  let parent: any = null;
  let result = "";
  const astTree = toAst(template, root, parent);
  const fn = createParseFn(astTree);
  try {
    result = fn(data) || "";
  } catch (e) {
    result = "";
  }
  return result;
}
