import cl from './SuccessModal.module.scss';
import Modal from '../../UI/modal/Modal';
import Icon from '../../UI/icon/Icon';

interface SuccessProps {
	isOpen: boolean;
	onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessProps) => {
	return (
		<Modal type="popup" isOpen={isOpen} onClose={onClose}>
			<Modal.Header title="Subscription Confirmed!" />

			<div className={cl.body}>
				<div className={cl.icon}>
					<Icon>check_circle</Icon>
				</div>
				<div className={cl.description}>
					You will now receive the latest updates, exclusive offers, and special content straight to
					your inbox. Stay tuned!
				</div>
			</div>
		</Modal>
	);
};

export default SuccessModal;
