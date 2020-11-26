import React, { useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DialogManager } from '../../DialogManager';
import DialogService from '../../DialogService';
import useDialog from '../../hooks/useDialog';

describe('DialogManager', () => {
  it('will render the component', async () => {
    DialogService.register('dialog', () => <div data-testid="dialog" />);

    const Button = () => {
      const { openDialog } = useDialog();
      return (
        <button data-testid="button" onClick={() => openDialog('dialog')}>
          Click
        </button>
      );
    };

    render(
      <DialogManager>
        <Button />
      </DialogManager>,
    );

    const button = await screen.findByTestId('button');

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByTestId('dialog')).toBeInTheDocument();
  });

  it('can close a dialog', async () => {
    DialogService.register('dialog', () => <div data-testid="dialog" />);

    const Button = () => {
      const { openDialog, closeDialog } = useDialog();

      useEffect(() => {
        openDialog('dialog');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <button data-testid="button" onClick={() => closeDialog()}>
          Click
        </button>
      );
    };

    render(
      <DialogManager>
        <Button />
      </DialogManager>,
    );

    const button = await screen.findByTestId('button');

    expect(screen.queryByTestId('dialog')).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });
});
