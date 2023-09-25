# Project Syntax

This is the Markdown syntax used to create projects in the curriculum.

## Markers

### `# <TITLE>`

```markdown
# <TITLE>
```

### `## <N>`

```markdown
## <LESSON_NUMBER>
```

```admonish note title=""
Zero-based numbering, because of course
```

````admonish example collapsible=true
```markdown
## 0
```
````

### `### --description--`

```markdown
### --description--

<DESCRIPTION_CONTENT>
```

````admonish example collapsible=true
```markdown
### --description--

This is the description content.
```
````

### `### --tests--`

````markdown
### --tests--

<TEST_TEXT>

```js
<TEST_CODE>
```
````

`````admonish example collapsible=true
````markdown
### --tests--

You should ...

```js
await new Promise(resolve => setTimeout(resolve, 2000));
assert.equal(true, true);
```
````
`````

### `### --seed--`

````markdown
### --seed--

#### --"<FILE_PATH>"--

```<FILE_EXTENSION>
<FILE_CONTENT>
```

#### --cmd--

```bash
<COMMAND>
```
````

`````admonish example collapsible=true
````markdown
#### --seed--

#### --"index.js"--

```js
// I am an example boilerplate file
```

#### --cmd--

```bash
npm install
```
````
`````

### `### --hints--`

````markdown
### --hints--

#### 0

Markdown-valid hint

#### 1

A second Markdown hint with code:

```rust
impl Developer for Camper {
  fn can_code(&self) -> bool {
    true
  }
}
```
````

#### `#### --force--`

Any seed marked with the force flag will overwrite the [`seedEveryLesson` configuration option](configuration.md#definitions-1). Specifically, the force flag causes the seed to run, if it were not going to, and it prevents the seed from running, if it were going to.

```markdown
### --seed--

#### --force--

<!-- Rest of seed -->
```

```admonish attention
The force flag is ignored when the whole project is reset.
```

### `## --fcc-end--`

An EOF discriminator.

```markdown
## --fcc-end--
```

## Example

`````admonish example collapsible=true title="<code>curriculum/locales/english/learn-x-by-building-y.md</code>"
````markdown
# freeCodeCampOS - Learn X by Building Y

## 0

### --description--

Declare a variable `a` with value `1`, in `index.js`.

```javascript
const a = 1;
```

### --tests--

You should declare a variable named `a`.

```js
const test = `console.assert(typeof a);`;
const filePath = 'learn-x-by-building-y/index.js';
const cb = (stdout, stderr) => {
  assert.isEmpty(stderr);
  assert.exists(stdout);
};
await __helpers.javascriptTest(filePath, test, cb);
```

You should give `a` a value of `1`.

```js
const test = `console.assert(a === 1, \`expected \${a} to equal 1\`);`;
const filePath = 'learn-x-by-building-y/index.js';
const cb = (stdout, stderr) => {
  assert.isEmpty(stderr);
  assert.exists(stdout);
};
await __helpers.javascriptTest(filePath, test, cb);
```

### --seed--

#### --"index.js"--

```js
// I am an example boilerplate file
```

## 1

### --description--

Create a new directory named `test`, and create a file `test/index.ts`.

Then add the following:

```ts
const test: string = 'test';
```

### --tests--

You should ...

```js
await new Promise(resolve => setTimeout(resolve, 2000));
assert.equal(true, true);
```

### --seed--

#### --"index.js"--

```javascript
// I am an example boilerplate file
const a = 1;
```

## 2

### --description--

Description.

### --tests--

You should ...

```js
await new Promise(resolve => setTimeout(resolve, 2000));
assert.equal(true, true);
```

### --seed--

#### --cmd--

```bash
echo "I should run first"
```

#### --cmd--

```bash
mkdir test
```

#### --cmd--

```bash
touch test/index.ts
```

#### --"test/index.ts"--

```ts
const test: string = 'test';
```

## 3

### --description--

Description.

### --tests--

You should ...

```js
await new Promise(resolve => setTimeout(resolve, 2000));
assert.equal(true, true);
```

## 4

### --description--

Description.

### --tests--

You should ...

```js
await new Promise(resolve => setTimeout(resolve, 2000));
assert.equal(true, true);
```

## 5

### --description--

Description.

### --tests--

This test will pass after 5 seconds.

```js
await new Promise(resolve => setTimeout(resolve, 5000));
assert.equal(1, 1);
```

## --fcc-end--
````
`````

It is also possible to add the seed for a lesson in a separate file named `<PROJECT_DASHED_NAME>-seed.md` within the `locales` directory.

`````admonish example collapsible=true title="<code>curriculum/locales/english/learn-x-by-building-y-seed.md</code>"
````markdown
## 1

### --seed--

#### --"index.js"--

```javascript
// Seed in a separate file
```

## --fcc-end--
````
`````

```admonish note
If seed for the same lesson is included in both the project file and a seed file, the seed in the project file will be used.
```
