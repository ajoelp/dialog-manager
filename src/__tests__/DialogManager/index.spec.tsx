import React from 'react';
import { render, screen } from '@testing-library/react';
import { DialogManager } from '../../DialogManager';

describe('DialogManager', () => {
  it('will render the component', async () => {
    render(<DialogManager />);
    expect(screen.queryByText('Dialog Manager')).toBeInTheDocument();
  });
});
