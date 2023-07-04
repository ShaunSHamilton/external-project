import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import Prism from 'prismjs';

marked.use(
  markedHighlight({
    highlight: (code, lang: keyof (typeof Prism)['languages']) => {
      if (Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], String(lang));
      } else {
        return code;
      }
    }
  })
);

marked.use({
  mangle: false,
  headerIds: false
});

export function parseMarkdown(markdown: string) {
  return marked.parse(markdown, { gfm: true });
}

export function parse(objOrString: any) {
  if (typeof objOrString === 'string') {
    return JSON.parse(objOrString);
  } else {
    return JSON.stringify(objOrString);
  }
}
