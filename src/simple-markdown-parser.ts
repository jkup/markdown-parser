enum State {
  TEXT,
  HEADER,
  LIST_ITEM,
  BOLD,
  ITALIC,
  LINK,
  LINK_TEXT,
  LINK_HREF,
}

export default class SimpleMarkdownParser {
  private output: string;

  constructor() {
    this.output = "";
  }

  parse(input: string): string {
    this.output = "";
    const lines = input.split("\n");
    let state: State = State.TEXT;
    let buffer = "";
    let linkText = "";
    let linkHref = "";

    const flushBuffer = () => {
      switch (state) {
        case State.HEADER:
          const level = buffer.length;
          this.output += `<h${level}>`;
          state = State.TEXT;
          break;
        case State.LIST_ITEM:
          this.output += "<li>";
          break;
        case State.BOLD:
          this.output += "<strong>";
          break;
        case State.ITALIC:
          this.output += "<em>";
          break;
        case State.LINK_HREF:
          this.output += `<a href="${buffer}">${linkText}</a>`;
          linkText = "";
          linkHref = "";
          break;
      }
      buffer = "";
    };

    const closeTag = () => {
      switch (state) {
        case State.HEADER:
          const level = buffer.length;
          this.output += `</h${level}>`;
          break;
        case State.LIST_ITEM:
          this.output += "</li>";
          break;
        case State.BOLD:
          this.output += "</strong>";
          break;
        case State.ITALIC:
          this.output += "</em>";
          break;
      }
    };

    for (const line of lines) {
      let i = 0;
      while (i < line.length) {
        const char = line[i];

        if (state === State.TEXT) {
          if (char === "#" && (i === 0 || line[i - 1] === "\n")) {
            flushBuffer();
            state = State.HEADER;
          } else if (char === "-" && (i === 0 || line[i - 1] === "\n")) {
            flushBuffer();
            state = State.LIST_ITEM;
          } else if (char === "*" && line[i + 1] === "*") {
            flushBuffer();
            state = State.BOLD;
            i++;
          } else if (char === "*" && line[i + 1] !== "*") {
            flushBuffer();
            state = State.ITALIC;
          } else if (char === "[") {
            flushBuffer();
            state = State.LINK_TEXT;
          } else {
            this.output += char;
          }
        } else if (state === State.HEADER) {
          if (char === " ") {
            flushBuffer();
          } else {
            buffer += char;
          }
        } else if (state === State.LIST_ITEM) {
          if (char === " ") {
            flushBuffer();
          } else {
            this.output += char;
          }
        } else if (state === State.BOLD) {
          if (char === "*" && line[i + 1] === "*") {
            closeTag();
            state = State.TEXT;
            i++;
          } else {
            this.output += char;
          }
        } else if (state === State.ITALIC) {
          if (char === "*") {
            closeTag();
            state = State.TEXT;
          } else {
            this.output += char;
          }
        } else if (state === State.LINK_TEXT) {
          if (char === "]") {
            state = State.LINK_HREF;
          } else {
            linkText += char;
          }
        } else if (state === State.LINK_HREF) {
          if (char === "(") {
            // Do nothing, just skip the character
          } else if (char === ")") {
            flushBuffer();
            state = State.TEXT;
          } else {
            buffer += char;
          }
        }

        i++;
      }

      // Process end of line
      if (state === State.HEADER || state === State.LIST_ITEM) {
        closeTag();
        this.output += "\n";
        state = State.TEXT;
      } else if (
        state !== State.BOLD &&
        state !== State.ITALIC &&
        state !== State.LINK_HREF
      ) {
        this.output += "\n";
      }
    }

    // Close any unclosed tags at the end of the input
    if (
      state === State.BOLD ||
      state === State.ITALIC ||
      state === State.LINK_HREF
    ) {
      closeTag();
    }

    return this.output.trim();
  }
}
