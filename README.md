# Simple Markdown Parser

A lightweight and easy-to-use TypeScript library for parsing a limited subset of Markdown syntax and converting it into HTML. It's perfect for small projects or applications that require basic Markdown support without the overhead of a full-featured library.

## Features

- Parses headers (h1 to h6)
- Parses unordered lists
- Parses bold and italic text
- Parses links
- Parses paragraphs

## Getting Started

To get started with the Simple Markdown Parser, follow these steps:

### Prerequisites

- Node.js (LTS or latest version)
- npm (comes bundled with Node.js)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/simple-markdown-parser.git
```

2. Change to the project directory:

```sh
cd simple-markdown-parser
```

3. Install dependencies:

```sh
npm install
```

4. Build the project:

```sh
npm run build
```

This will generate the compiled JavaScript files in the dist folder.

### Usage

You can use the Simple Markdown Parser in your projects like this:

```javascript
import SimpleMarkdownParser from "simple-markdown-parser";

const parser = new SimpleMarkdownParser();
const markdown = `# Hello, Markdown!

- This is a list item
- This is another item

This is a **bold** and *italic* text. Check out [my website](https://example.com).`;

console.log(parser.parse(markdown));
```

This example will output the following HTML:

```html
<h1>Hello, Markdown!</h1>
<ul>
  <li>This is a list item</li>
  <li>This is another item</li>
</ul>
<p>
  This is a <strong>bold</strong> and <em>italic</em> text. Check out
  <a href="https://example.com">my website</a>.
</p>
```

## Roadmap

Here's what we have left to do to make this library even better:

- Add support for ordered lists
- Add support for blockquotes
- Add support for code blocks
- Improve test coverage for edge cases
- Add a demo website to showcase usage

## Contributing

We welcome contributions! Feel free to submit pull requests, report bugs, or suggest new features by creating issues.

## License

This project is released under the MIT License. See the [LICENSE](./LICENSE) file for details.
