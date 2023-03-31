// Usage example
import SimpleMarkdownParser from "./dist/index.js";

const parser = new SimpleMarkdownParser();
const markdown = `# Hello, Markdown!
  
  - This is a list item
  - This is another item
  
  This is a **bold** and *italic* text. Check out [my website](https://example.com).`;

console.log(parser.parse(markdown));
