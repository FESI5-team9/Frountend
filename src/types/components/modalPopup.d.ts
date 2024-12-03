export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  id?: string;
}

export interface ModalProps extends PopupProps {
  title: string;
}
