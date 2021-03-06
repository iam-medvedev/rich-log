# Rich Log

<center>
React plugin for writing styled console logs using JSX.
</center>

## Get started

```bash
yarn add rich-log
```

[Try it on CodeSandbox](https://codesandbox.io/s/silly-roman-3x7zcw?file=/src/App.tsx)

```tsx
import RichLog from 'rich-log';

RichLog.log(
  <RichLog.Fragment>
    <RichLog.Text>This is </RichLog.Text>
    <RichLog.Text
      color="white"
      background="linear-gradient(#555, #333)"
      padding="2px 6px"
      borderRadius="4px 0 0 4px"
      fontFamily="monospace"
    >
      rich-log
    </RichLog.Text>
    <RichLog.Text
      color="white"
      background="linear-gradient(#222, #090909)"
      padding="2px 6px"
      borderRadius="0 4px 4px 0"
      fontWeight="bold"
      fontFamily="monospace"
    >
      v1.0.0
    </RichLog.Text>
  </RichLog.Fragment>,
);
```

Output:

<img alt="rich-log preview" width="220" src="./readme-assets/1.png" />

Thats it!

## Benefits ✨

- JSX in `console.log`
- Styling with props (like styled-component)
- Lightweight
- Written in Typescript
- Works with React and Preact

## Components

### `<RichLog.Text />`

A component for displaying styled text.

```tsx
RichLog.log(
  <RichLog.Text fontSize="12px" color="green">
    Hello world
  </RichLog.Text>,
);
```

Output:

<img alt="rich-log text component output" width="130" src="./readme-assets/2.png" />

### `<RichLog.Fragment />`

If you want to display several components at once, you can nest them in a fragment.

```tsx
RichLog.log(
  <RichLog.Fragment>
    <RichLog.Text>My name is: </RichLog.Text>
    <RichLog.Text fontWeight="bold">Slim Shady</RichLog.Text>
  </RichLog.Fragment>,
);
```

Output:

<img alt="rich-log fragment component output" width="184" src="./readme-assets/3.png" />

If you want to separate text lines, you use the `separate`-prop:

```tsx
RichLog.log(
  <RichLog.Fragment>
    <RichLog.Text separate>First line</RichLog.Text>
    <RichLog.Text fontWeight="bold">Second line</RichLog.Text>
  </RichLog.Fragment>,
);
```

Output:

<img alt="rich-log separate text component output" width="120" src="./readme-assets/4.png" />

### `<RichLog.Table />`

Component for rendering data to table.

```tsx
RichLog.log(<RichLog.Table data={{ foo: true, bar: 1 }} />);
```

Output:

<img alt="rich-log table component output" width="487" src="./readme-assets/5.png" />

### `<RichLog.Group />`

Component for grouping logs.

```tsx
RichLog.log(
  <RichLog.Group
    header={
      <RichLog.Text fontSize="20px" fontFamily="monospace" background="black" color="white">
        Collapsed group
      </RichLog.Text>
    }
  >
    <RichLog.Text>I'am a text inside group</RichLog.Text>
  </RichLog.Group>,
);
```

Output:

<img alt="rich-log group component output" width="221" src="./readme-assets/6.png" />

### `<RichLog.Img />`

Component for rendering images and gifs.

```tsx
RichLog.log(
  <RichLog.Fragment>
    <RichLog.Img height="60px" width="60px" src="https://c.tenor.com/fFntTHJYFPMAAAAC/random.gif" marginRight="8px" />
    <RichLog.Img height="60px" width="60px" src="https://picsum.photos/120/120" />
  </RichLog.Fragment>,
);
```

Output:

<img alt="rich-log img component output" width="177" src="./readme-assets/8.gif" />

### `<RichLog.SVG />`

Component for rendering svg icons.

```tsx
RichLog.log(
  <RichLog.SVG height="60px" width="60px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  </RichLog.SVG>,
);
```

Output:

<img alt="rich-log svg component output" width="107" src="./readme-assets/7.png" />

### `<RichLog.Box />`

Component for rendering boxes.

```tsx
RichLog.log(
  <RichLog.Fragment>
    <RichLog.Box background="red" borderRadius="50%" width="20px" height="20px" marginRight="4px" />
    <RichLog.Box background="yellow" borderRadius="50%" width="20px" height="20px" marginRight="4px" />
    <RichLog.Box background="green" borderRadius="50%" width="20px" height="20px" />
  </RichLog.Fragment>,
);
```

<img alt="rich-log svg component output" width="119" src="./readme-assets/9.png" />

## TODO

- [ ] Safari support
- [ ] Styled tables

## License

`rich-log` is [WTFPL licensed](./LICENSE).
