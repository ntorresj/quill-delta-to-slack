const render = require('./fromDelta')

test('renders inline format', function () {
  expect(
    render([
      {
        insert: 'Hi ',
      },
      {
        attributes: {
          bold: true,
        },
        insert: 'mom',
      },
    ])
  ).toEqual('Hi *mom*\n')
});

test('renders lists with inline formats correctly', function () {
  expect(
    render([
      {
        attributes: {
          italic: true,
        },
        insert: 'Glenn v. Brumby',
      },
      {
        insert: ', 663 F.3d 1312 (11th Cir. 2011)',
      },
      {
        attributes: {
          list: 'ordered',
        },
        insert: '\n',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Barnes v. City of Cincinnati',
      },
      {
        insert: ', 401 F.3d 729 (6th Cir. 2005)',
      },
      {
        attributes: {
          list: 'ordered',
        },
        insert: '\n',
      },
    ])
  ).toEqual(
    '1. _Glenn v. Brumby_, 663 F.3d 1312 (11th Cir. 2011)\n2. _Barnes v. City of Cincinnati_, 401 F.3d 729 (6th Cir. 2005)\n'
  )
});

test('renders adjacent lists correctly', function () {
  expect(
    render([
      {
        insert: 'Item 1',
      },
      {
        insert: '\n',
        attributes: {
          list: 'ordered',
        },
      },
      {
        insert: 'Item 2',
      },
      {
        insert: '\n',
        attributes: {
          list: 'ordered',
        },
      },
      {
        insert: 'Item 3',
      },
      {
        insert: '\n',
        attributes: {
          list: 'ordered',
        },
      },
      {
        insert: 'Intervening paragraph\nItem 4',
      },
      {
        insert: '\n',
        attributes: {
          list: 'ordered',
        },
      },
      {
        insert: 'Item 5',
      },
      {
        insert: '\n',
        attributes: {
          list: 'ordered',
        },
      },
      {
        insert: 'Item 6',
      },
      {
        insert: '\n',
        attributes: {
          list: 'ordered',
        },
      },
    ])
  ).toEqual(
    '1. Item 1\n2. Item 2\n3. Item 3\n\nIntervening paragraph\n1. Item 4\n2. Item 5\n3. Item 6\n'
  )
});

test('render strike', function () {
  expect(
    render([{ "attributes": { "strike": true }, "insert": "tachada" }])
  ).toEqual('~tachada~\n')
});

test('renders a separator block', function () {
  expect(
    render([
      {
        insert: 'Before\n',
      },
      {
        insert: { thematic_break: true },
      },
      {
        insert: 'After\n',
      },
    ])
  ).toEqual('Before' + '\n' + '\n' + '---' + '\n' + 'After' + '\n')
});

test('renders simple bullet', function () {
  expect(
    render([
      {
        insert: 'Hello',
      },
      {
        attributes: { list: "bullet" },
        insert: "\n",
      },
      {
        insert: 'World',
      },
      {
        attributes: { list: "bullet" },
        insert: "\n",
      },
    ])
  ).toEqual('- Hello\n- World\n')
});

test('renders indent 1 bullet', function () {
  expect(
    render([
      {
        insert: 'Hello',
      },
      {
        attributes: { list: "bullet" },
        insert: "\n",
      },
      {
        insert: 'World',
      },
      {
        attributes: { indent: 1, list: "bullet" },
        insert: "\n",
      },
    ])
  ).toEqual('- Hello\n  - World\n')
});

test('renders indent 4 bullets', function () {
  expect(
    render([
      {
        insert: 'Hello',
      },
      {
        attributes: { list: "bullet" },
        insert: "\n",
      },
      {
        insert: 'World',
      },
      {
        attributes: { indent: 4, list: "bullet" },
        insert: "\n",
      },
    ])
  ).toEqual('- Hello\n     - World\n')
});