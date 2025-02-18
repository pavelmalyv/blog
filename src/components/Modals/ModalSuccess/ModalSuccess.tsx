import Modal from '../../UI/modal/Modal';

interface SuccessProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalSuccess = ({ isOpen, onClose }: SuccessProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			ModalSuccess
		</Modal>
	);
};

export default ModalSuccess;
