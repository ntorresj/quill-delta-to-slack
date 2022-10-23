const Node = require('./utils/Node');

module.exports = {
  embed: {
    // Not a default Quill feature, converts custom divider embed blot added when
    // creating quill editor instance.
    // See https://quilljs.com/guides/cloning-medium-with-parchment/#dividers
    thematic_break: function() {
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
          this.open = '- ' + this.open;
        } else if (attrs.list === "checked") {
          this.open = '- [x] ' + this.open;
        } else if (attrs.list === "unchecked") {
          this.open = '- [ ] ' + this.open;
        } else if (attrs.list === 'ordered') {
          group.count = group.count || 0;
          var count = ++group.count;
          this.open = count + '. ' + this.open;
        }
      },
    }
  },
}
