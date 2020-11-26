import { useContext } from 'react';
import DialogManagerContext from '../contexts/DialogManagerContext';

export default function useDialog() {
  const context = useContext(DialogManagerContext);

  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogManagerContext');
  }

  return context;
}
