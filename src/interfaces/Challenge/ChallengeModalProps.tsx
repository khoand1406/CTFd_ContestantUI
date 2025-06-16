export interface ModalProps {
  isOpen: boolean;
  message: string;
  title?: string;
  onClose: () => void;
}