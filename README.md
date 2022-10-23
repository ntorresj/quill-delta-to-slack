## Quill delta to Slack converter

Converter from the [Delta](https://quilljs.com/docs/delta/) document format used by the [Quill](https://quilljs.com/) text editor to Markdown.
Using the documentation provider by [Slack - Format your messages](https://slack.com/help/articles/202288908-Format-your-messages#formatting-toolbar)

## Usage

```javascript
const { deltaToSlack } = require('quill-delta-to-markdown')
const markdown = deltaToSlack(deltaFromElseWhere)
```


## Test

### Javascript

```
npm install
npm test
```

### Docker

```
docker compose run --rm quill2slack npm test
```

## About

This lib was forked from [frysztak's fork](https://github.com/frysztak/quill-delta-to-markdown). Open source!
