import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkRehype)
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-link']
      }
    })
    .use(rehypeHighlight) // Syntax highlighting for code blocks
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}