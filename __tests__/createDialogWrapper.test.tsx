import React, { useEffect } from 'react';
import { createDialogWrapper } from '../src/createDialogWapper';
import { act, render, screen } from '@testing-library/react';

jest.mock('../src/components/Portal', () => ({
  Portal: ({ children }: any) => <>{children}</>,
}));

function renderWithDialogs<T extends object>(dialogs: T, wrapper?: any) {
  const { DialogManager, useDialogs } = createDialogWrapper(dialogs);
  let result: ReturnType<typeof useDialogs>;

  const Component = () => {
    result = useDialogs();
    return null;
  };

  const Wrapper = wrapper ? wrapper(useDialogs) : null;

  render(
    <DialogManager>
      {Wrapper && <Wrapper />}
      <Component />
    </DialogManager>,
  );

  // @ts-ignore
  return result;
}

describe('DialogManager', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe('opening the dialog', () => {
    it('will open a dialog', async () => {
      const dialog = jest.fn(() => <div data-testid='dialog' />);
      const Dialogs = { dialog };
      const { openDialog } = renderWithDialogs(Dialogs);
      act(() => {
        openDialog('dialog');
        jest.advanceTimersByTime(500);
      });
      expect(dialog).toHaveBeenCalled();
      expect(await screen.findByTestId('dialog')).toBeInTheDocument();
    });

    it('will open a dialog with props', async () => {
      type DialogProps = { message: string };
      const dialog = jest.fn((props: DialogProps) => <div data-testid='dialog'>{props.message}</div>);
      const Dialogs = { dialog };
      const { openDialog } = renderWithDialogs(Dialogs);
      const props = { message: 'This is a message' };
      act(() => {
        openDialog('dialog', props);
        jest.advanceTimersByTime(500);
      });
      expect(dialog).toHaveBeenCalled();
      expect(dialog).toHaveBeenLastCalledWith(expect.objectContaining(props), {});
      expect(await screen.findByTestId('dialog')).toBeInTheDocument();
    });

    it('will open a dialog with timeout', async () => {
      const dialog = jest.fn(() => <div data-testid='dialog' />);
      const Dialogs = { dialog };
      const { openDialog } = renderWithDialogs(Dialogs);
      act(() => {
        openDialog('dialog');
      });
      expect(dialog).toHaveBeenCalledWith(expect.objectContaining({ active: false }), {});
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(dialog).toHaveBeenCalledWith(expect.objectContaining({ active: true }), {});
      expect(await screen.findByTestId('dialog')).toBeInTheDocument();
    });
  });

  describe('closing the dialog', () => {
    it('will close the dialog', async () => {
      const dialog = jest.fn(() => <div data-testid='dialog' />);
      const Dialogs = { dialog };
      const { openDialog, closeDialog } = renderWithDialogs(Dialogs);
      act(() => {
        openDialog('dialog');
        jest.advanceTimersByTime(500);
      });
      expect(dialog).toHaveBeenCalled();
      expect(await screen.queryByTestId('dialog')).toBeInTheDocument();
      act(() => {
        closeDialog();
        jest.advanceTimersByTime(500);
      });
      expect(await screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });

    it('will close the dialog with timeouts', async () => {
      const dialog = jest.fn(() => <div data-testid='dialog' />);
      const Dialogs = { dialog };
      const { openDialog, closeDialog } = renderWithDialogs(Dialogs);
      act(() => {
        openDialog('dialog');
        jest.advanceTimersByTime(500);
      });
      expect(dialog).toHaveBeenCalled();
      expect(await screen.queryByTestId('dialog')).toBeInTheDocument();
      act(() => {
        closeDialog();
      });
      expect(dialog).toHaveBeenCalledWith(expect.objectContaining({ active: false }), {});
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(await screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not modify methods when dialog is changed', () => {
    const effectCalled = jest.fn();
    const Wrapper = (useDialogs: any) => () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { openDialog } = useDialogs();

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        effectCalled();
      }, [openDialog]);

      return <div />;
    };

    const dialog = jest.fn(() => <div data-testid="dialog" />);
    const Dialogs = { dialog };
    const { openDialog, closeDialog } = renderWithDialogs(Dialogs, Wrapper);

    act(() => {
      openDialog('dialog');
      jest.advanceTimersByTime(500);
    });

    expect(effectCalled).toHaveBeenCalledTimes(1);
  })
});
