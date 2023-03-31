import SimpleMarkdownParser from "../src/simple-markdown-parser";

describe("SimpleMarkdownParser", () => {
  const parser = new SimpleMarkdownParser();

  test("should parse headers", () => {
    const input = "# Header 1\n## Header 2\n### Header 3";
    const expectedOutput =
      "<h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3>";
    expect(parser.parse(input)).toBe(expectedOutput);
  });

  test("should parse lists", () => {
    const input = "- Item 1\n- Item 2\n- Item 3";
    const expectedOutput =
      "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>";
    expect(parser.parse(input)).toBe(expectedOutput);
  });

  test("should parse inline elements", () => {
    const input =
      "This is **bold**, *italic*, and [a link](https://example.com).";
    const expectedOutput =
      '<p>This is <strong>bold</strong>, <em>italic</em>, and <a href="https://example.com">a link</a>.</p>';
    expect(parser.parse(input)).toBe(expectedOutput);
  });

  test("should parse paragraphs", () => {
    const input = "Paragraph 1\n\nParagraph 2";
    const expectedOutput = "<p>Paragraph 1</p><p>Paragraph 2</p>";
    expect(parser.parse(input)).toBe(expectedOutput);
  });

  test("should handle empty input", () => {
    const input = "";
    const expectedOutput = "";
    expect(parser.parse(input)).toBe(expectedOutput);
  });
});
