export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ModalProps extends PopupProps {
  title: string;
}
