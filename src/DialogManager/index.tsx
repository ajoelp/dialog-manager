import React, { FC, useState } from 'react';
import DialogService from '../DialogService';
import DialogManagerContext from '../contexts/DialogManagerContext';

export type DialogManagerProps = {};

export const DialogManager: FC<DialogManagerProps> = ({ children }) => {
  const [dialogName, setDialogName] = useState<string>();

  const DialogNode = dialogName ? DialogService.get(dialogName) : null;

  const closeDialog = () => {
    setDialogName(undefined);
  };

  const openDialog = (name: string) => {
    setDialogName(name);
  };

  return (
    <DialogManagerContext.Provider value={{ currentDialog: dialogName, openDialog, closeDialog }}>
      {children}
      {DialogNode ? <DialogNode /> : null}
    </DialogManagerContext.Provider>
  );
};
