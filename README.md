# Modal

> Modal react component

## Install

```sh
yarn add @alobato/modal
```

## Usage

```js
import Modal from '@alobato/modal'
...

const StyledModal = styled(Modal)`
  & > div {
    position: relative;
    background-color: white;
    box-shadow: 0 7px 8px -4px rgba(0,0,0,0.2), 0 13px 19px 2px rgba(0,0,0,0.14), 0 5px 24px 4px rgba(0,0,0,0.12);
    pointer-events: auto;
    width: 100%;
    height: calc(100vh);
    height: calc(100vh - 64px); /* test */
    margin: 0;
    margin: 32px auto; /* test */
    overflow: hidden;
    @media (min-width: 40em) {
      margin: 32px auto;
      width: auto;
      /* height: min-content; */
      height: calc(100vh - 64px);
      max-height: 800px;
      min-width: 640px;
      border-radius: 8px;
    }
  }
`
```
