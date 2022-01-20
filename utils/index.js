import entities from "./entities";

export { request } from './request';

// rawhtml = null, default value is invalid
export function parseText(rawhtml) {
  const textStyle = deconstructStyle({
    color: '#555',
  })

  const titleStyle = deconstructStyle({
    fontWeight: 'bolder',
  })

  const nullText = {
    idx: 1,
    type: 'text',
    style: textStyle,
    value: "Not prepare yet."
  }

  if (!rawhtml) {
    return [nullText]
  }

  let content = rawhtml.replace(/(\r\n|\n|\r)/gm, "");

  for (let key in entities) {
    const re = new RegExp("&" + key + ";", "g");
    content = content.replace(re, entities[key]);
  }
  const hReg = /<p[^>]*>(.*?)<\/p>/gm;
  const texts = content.match(hReg);

  if (texts) {
    return texts.map((item, index) => {
      if (item.includes("</strong>")) {
        const tRe = /<p><strong[^>]*>(.*?)<\/strong><\/p>/g;
        return {
          idx: index,
          type: "title",
          style: titleStyle,
          value: item.replace(tRe, "$1"),
        };
      }
      return {
        idx: index,
        type: "text",
        style: textStyle,
        value: item.replace(/<p[^>]*>(.*?)<\/p>/g, "$1"),
      };
    });
  }
  return [nullText];
}

function deconstructStyle(styleObj) {
  return Object.keys(styleObj).reduce((acc, style) => {
    const styleVal = styleObj[style] + ';'
    const transformStyleKey = style.replace(/([A-Z])/g, "-$1").toLowerCase();
    acc += `${transformStyleKey}:${styleVal}`
    return acc;
  }, '');
}