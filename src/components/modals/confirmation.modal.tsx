import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import {
  PrimaryButton,
  IconOutlineButton,
  PrimaryOutlineButton,
} from 'src/components/button';
import { MdOutlineClose } from 'react-icons/md';

type ConfirmationModalProps = {
  open?: boolean;
  loading?: boolean;
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
};

export const ConfirmationModal = ({
  open = false,
  loading = false,
  message = '',
  onClose = () => {},
  onConfirm = () => {},
}: ConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl space-y-6 rounded-3xl p-10 bg-white">
          <DialogTitle className="flex justify-between items-center">
            <p className="text-xl font-semibold">Are you sure?</p>
            <IconOutlineButton
              type="button"
              icon={<MdOutlineClose size={20} />}
              onClick={onClose}
              disabled={loading}
            />
          </DialogTitle>

          <div className="text-center">
            <p>{message || 'Want to delete this item?'}</p>

            <div className="flex items-center justify-center gap-2 mt-6">
              <PrimaryButton
                type="button"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? 'Wait a moment...' : "Yes, I'm sure"}
              </PrimaryButton>
              <PrimaryOutlineButton
                type="button"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </PrimaryOutlineButton>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
