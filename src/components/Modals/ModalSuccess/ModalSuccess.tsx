import Modal from '../../UI/modal/Modal';

interface SuccessProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalSuccess = ({ isOpen, onClose }: SuccessProps) => {
	return (
		<Modal type="popup" isOpen={isOpen} onClose={onClose}>
			<Modal.Header title="Subscription Confirmed!" />
		</Modal>
	);
};

export default ModalSuccess;
