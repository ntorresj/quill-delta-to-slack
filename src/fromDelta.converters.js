const Node = require('./utils/Node');

module.exports = {
  embed: {
    // Not a default Quill feature, converts custom divider embed blot added when
    // creating quill editor instance.
    // See https://quilljs.com/guides/cloning-medium-with-parchment/#dividers
    thematic_break: function () {
      this.open = '\n---\n' + this.open;
    },
  },

  inline: {
    italic: function () {
      return ['_', '_'];
    },
    bold: function () {
      return ['*', '*'];
    },
    strike: function () {
      return ['~', '~'];
    },
  },

  block: {
    blockquote: function () {
      this.open = '> ' + this.open;
    },
    'list': {
      group: function () {
        return new Node(['', '\n']);
      },
      line: function (attrs, group) {
        if (attrs.list === 'bullet') {
          let pad = 2;
          if ('indent' in attrs) {
            pad += attrs.indent;
          }
          this.open = '• '.padStart(pad, '	') + this.open;
        } else if (attrs.list === "checked") {
          this.open = `- [x] ${this.open}`;
        } else if (attrs.list === "unchecked") {
          this.open = `- [ ] ${this.open}`;
        } else if (attrs.list === 'ordered') {
          const currentIndent = attrs.indent || 0;
          const previousIndent = group.previousIndent || 0;
          group.count = group.count || 0;
          let character = ++group.count;

          switch (true) {
            case currentIndent === 0:
              group.levels = {};
              break;
            default:
              if (!(currentIndent in group.levels)) {
                group.levels[currentIndent] = 0;
              }
              ++group.levels[currentIndent];
              break;
          };

          if (currentIndent > 0 || currentIndent > previousIndent) {
            const leftPadding = ''.padStart(currentIndent, '	');
            --group.count;

            switch (true) {
              case currentIndent % 3 === 0:
                character = `${leftPadding}${group.levels[currentIndent].toString()}`;
                break;
              case currentIndent % 2 === 0:
                character = `${leftPadding}${(new Node()).intToRoman(group.levels[currentIndent], false)}`;
                break;
              case currentIndent % 1 === 0:
                character = `${leftPadding}${(new Node()).intToLetter(group.levels[currentIndent], false)}`;
                break;
            }
          }

          group.previousIndent = currentIndent
          this.open = `${character}. ${this.open}`;
        }
      },
    }
  },
}
