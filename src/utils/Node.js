const isArray = require('lodash/isArray')
const isString = require('lodash/isString')
const pull = require('lodash/pull')

var id = 0

class Node {
  constructor(data) {
    this.id = ++id
    if (isArray(data)) {
      this.open = data[0]
      this.close = data[1]
    } else if (isString(data)) {
      this.text = data
    }
    this.children = []
  }

  append(e) {
    if (!(e instanceof Node)) {
      e = new Node(e)
    }
    if (e._parent) {
      pull(e._parent.children, e)
    }
    e._parent = this
    this.children = this.children.concat(e)
  }

  render() {
    var text = ''
    if (this.open) {
      text += this.open
    }
    if (this.text) {
      text += this.text
    }
    for (var i = 0; i < this.children.length; i++) {
      text += this.children[i].render()
    }
    if (this.close) {
      text += this.close
    }
    return text
  }

  parent() {
    return this._parent
  }

  intToRoman(num, upperCase = true) {
    const map = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let result = '';

    for (let key in map) {
      result += key.repeat(Math.floor(num / map[key]));
      num %= map[key];
    }

    if (upperCase) {
      return result;
    }

    return result.toLowerCase();
  };

  intToLetter(num, upperCase = true) {
    const alpha = Array.from(Array(26)).map((_, i) => i + 97);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    if (upperCase) {
      return alphabet[num - 1];
    }

    return alphabet[num - 1].toLowerCase();
  }
}

module.exports = Node
