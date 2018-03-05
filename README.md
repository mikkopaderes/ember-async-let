ember-async-let
==============================================================================

 Alias the result of an async call to a new name

Installation
------------------------------------------------------------------------------

```
ember install ember-async-let
```

Usage
------------------------------------------------------------------------------

### `{{async-let}}`

A tagless component that prevents a block from rendering until the passed-in promise resolves

#### Async property

```hbs
{{#async-let on=(async-property property) as |resolvedData|}}
  <div>{{resolvedData}}</div>
{{/async-let}}
```

#### Async function

```javascript
const context = {
  methodName(param1, param2) {
    return Promise.resolve('foobar');
  }
};
```

```hbs
{{#async-let on=(async-function context 'methodName' param1AsVariable 'param2-as-string') as |resolvedData|}}
  <div>{{resolvedData}}</div>
{{/async-let}}
```

#### Component placeholder

This will show a specified component as a placeholder until the async call resolves

```hbs
{{#async-let on=(async-property property) placeholder=(component 'my-spinner') as |resolvedData|}}
  <div>{{resolvedData}}</div>
{{/async-let}}
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-async-let`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
