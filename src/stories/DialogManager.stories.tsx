import { DialogManager, DialogManagerProps } from '../DialogManager';
import { Meta, Story } from '@storybook/react';
import React from 'react'

const meta: Meta = {
  title: 'DialogManager',
  component: DialogManager,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<DialogManagerProps> = (args) => (
  <DialogManager {...args} />
)

export const Default = Template.bind({});
Default.args = {};
