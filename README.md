# Dialog Manager

## Install

```sh
npm install dialog-manager-react
```

## Usage

Create a file in your project for defining your dialogs

`DialogManager.tsx`

```tsx
import { lazy } from 'react'
import { createDialogWrapper } from "dialog-manager-react";

const Dialogs = {
    'loginDialog': Dialog, // Use functional components
    'loginDialog2': lazy(() => import('./LoginDialog')) // Use lazy loaded components
};

const { DialogManager, useDialogs } = createDialogWrapper(Dialogs);

export {
    DialogManager,
    useDialogs
}
```

Now in the root of the project you'll need to set up the DialogManager

`index.tsx`

```tsx
import { DialogManager } from './DialogManager'

ReactDOM.render(
    <DialogManager>
        <App />
    </DialogManager>,
    document.getElementById('root') as HTMLElement
);
```

Create a Dialog

`Dialog.tsx`
```tsx
import { DialogProps } from "dialog-manager-react";

type LoginDialogProps = { title: string } & DialogProps

export default function LoginDialog(props: LoginDialogProps) {
    const { closeDialog, active, title } = props;
    return <Component />
}
```

Using the hook inside a component

```tsx

import { useDialogs } from './DialogManager'

export default function LoginButton() {
    const { openDialog, closeDialog } = useDialogs()
    
    const open = () => {
        openDialog('loginDialog', { title: 'This is the title' })
    }

    const close = () => {
        closeDialog()
    }
    
    return (
        <>
            <button onClick={open}>
                Open
            </button>
            <button onClick={close}>
                Close
            </button>
        </>
    )
}
```

# API

## `createDialogWrapper(dialogs: object, options: DialogWrapperOptions)`

### dialogs
A key value of dialog names and ReactComponents.

```tsx
const Dialogs = {
    'loginDialog': Dialog, // Use functional components
    'loginDialog2': lazy(() => import('./LoginDialog')) // Use lazy loaded components
};
```

### options

| key        | default           | Description  | Type |
| ------------- |:-------------:| :-----:| :-----:|
| `showTimeout`      | `200` | Timeout between when the closeModal is called and the modal is removed from the dom | `number`


## `useDialog()`
A hook to access the dialog context

### returns

### `openDialog(name: DialogName, props: ComponentProps)`

#### name
Name of the dialog you defined

#### props
The props of that dialog component
