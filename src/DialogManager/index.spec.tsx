import React from 'react';
import { render, screen } from '@testing-library/react';
import { DialogManager } from '.';

describe('DialogManager', () => {
  it('will render the component', async () => {
    render(<DialogManager />);
    expect(await screen.findByText('Dialog Manager')).toBeInTheDocument();
  });
});
