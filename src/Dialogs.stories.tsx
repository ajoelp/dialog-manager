import React, { FC, Fragment } from 'react';
import { Meta } from '@storybook/react';
import { createDialogWrapper, DialogProps } from './createDialogWapper';
import { Dialog as Modal, Transition } from '@headlessui/react';

type SampleDialogProps = {
  title: string;
  message?: string;
} & DialogProps;

const Dialog = (props: SampleDialogProps) => {
  return (
    <Transition.Root show={props.active} as={Fragment}>
      <Modal
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={props.active}
        onClose={() => props.closeDialog()}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Modal.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Modal.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {props.title}
                  </Modal.Title>
                  {props.message != null && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{props.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => props.closeDialog()}
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Modal>
    </Transition.Root>
  );
};

const Dialogs = {
  'dialog-1': Dialog,
};

const { DialogManager, useDialogs } = createDialogWrapper(Dialogs);

export default {
  title: 'DialogManager',
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

const Buttons = () => {
  const { openDialog } = useDialogs();

  const open = () => {
    openDialog('dialog-1', {
      title: 'test title',
    });
  };

  return (
    <p>
      <button
        onClick={() => {
          open();
        }}
      >
        open
      </button>
    </p>
  );
};

const Wrapper: FC = ({ children }) => {
  return <DialogManager>{children}</DialogManager>;
};

export const Default = () => {
  return (
    <Wrapper>
      <Buttons />
    </Wrapper>
  );
};
