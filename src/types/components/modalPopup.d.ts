export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export interface ModalProps extends PopupProps {
  title: string;
}
