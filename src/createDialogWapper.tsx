import React, {
  Component,
  ComponentType,
  createContext,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Portal } from './components/Portal';

type GetComponentProps<T> = T extends ComponentType<infer P> | Component<infer P> ? P : never;

export type DialogProps = {
  closeDialog(): void;
  active: boolean;
};

type DialogWrapperOptions = {
  showTimeout?: number;
  suspenseFallback?: ReactNode;
};

export function createDialogWrapper<DialogsObject extends object>(
  dialogs: DialogsObject,
  options: DialogWrapperOptions = {},
) {
  const { showTimeout = 200, suspenseFallback = null } = options;

  type ComponentProps<Component> = Omit<GetComponentProps<Component>, 'closeDialog' | 'active'>;
  type DialogKeys = keyof typeof dialogs;

  type DialogManagerContextShape = {
    currentDialog?: DialogKeys;
    openDialog<Type extends DialogKeys>(name: Type, props?: ComponentProps<DialogsObject[Type]>): void;
    closeDialog(): void;
  };

  const DialogManagerContext = createContext<DialogManagerContextShape>({
    openDialog<Type extends DialogKeys>(_name: Type, _props?: ComponentProps<DialogsObject[Type]>) {},
    closeDialog() {},
  });

  function useDialogs() {
    const context = useContext(DialogManagerContext);
    if (context == null) {
      throw new Error('useDialogs must be used inside a DialogManager');
    }
    return context;
  }

  function DialogManager(props: { children?: ReactNode }) {
    const [dialog, setDialog] = useState<DialogKeys | undefined>();
    const [active, setDialogActive] = useState<DialogKeys | undefined>();
    const [dialogProps, setDialogProps] = useState<any>({});

    const openDialog = useCallback(
      <Type extends DialogKeys>(name: Type, props?: ComponentProps<DialogsObject[Type]>) => {
        if (props != null) {
          setDialogProps(props);
        }
        setDialog(name);
        setTimeout(() => {
          setDialogActive(name);
        }, showTimeout);
      },
      [setDialogProps, setDialogActive],
    );

    const closeDialog = useCallback(() => {
      setDialogActive(undefined);
      setTimeout(() => {
        setDialog(undefined);
      }, showTimeout);
    }, [setDialogActive, setDialog]);

    const providerValue = {
      openDialog,
      currentDialog: dialog,
      closeDialog,
    };

    const Dialog = dialog ? (dialogs[dialog] as any) : null;

    return (
      <DialogManagerContext.Provider value={providerValue}>
        {props.children}
        {Dialog != null && (
          <Suspense fallback={suspenseFallback}>
            <Portal>
              <Dialog {...{ closeDialog, active: active === dialog, ...dialogProps }} />
            </Portal>
          </Suspense>
        )}
      </DialogManagerContext.Provider>
    );
  }

  return {
    DialogManager,
    useDialogs,
  };
}
