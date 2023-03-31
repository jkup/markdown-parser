export default class SimpleMarkdownParser {
  parse(markdown: string): string {
    return this.parseLines(markdown.split("\n")).join("");
  }

  parseLines(lines: string[]): string[] {
    let html: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // Headers
      const headerMatch = line.match(/^(#+)\s+(.*)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        html.push(`<h${level}>${this.parseInline(headerMatch[2])}</h${level}>`);
        continue;
      }

      // Lists
      let listMatch = line.match(/^(-|\*|\+)\s+(.*)$/);
      if (listMatch) {
        const items: string[] = [];
        while (listMatch && i < lines.length) {
          items.push(`<li>${this.parseInline(listMatch[2])}</li>`);
          i++;
          if (i < lines.length) {
            line = lines[i].trim();
            listMatch = line.match(/^(-|\*|\+)\s+(.*)$/);
          }
        }
        html.push(`<ul>${items.join("")}</ul>`);
        i--;
        continue;
      }

      // Paragraphs
      if (line.length > 0) {
        html.push(`<p>${this.parseInline(line)}</p>`);
      }
    }

    return html;
  }

  parseInline(line: string): string {
    // Bold and italic
    line = line.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");
    line = line.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

    // Links
    line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    return line;
  }
}
