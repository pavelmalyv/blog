import classNames from 'classnames';
import cl from './Modal.module.scss';
import ReactModal from 'react-modal';

interface ModalProps {
	type?: 'full';
	isOpen: boolean;
	children: React.ReactNode;
	aria?: {
		label?: string;
		labelledby?: string;
		describedby?: string;
	};
	onClose: () => void;
}

const Modal = ({ type = 'full', isOpen, children, aria, onClose }: ModalProps) => {
	return (
		<ReactModal
			bodyOpenClassName={cl['body-open']}
			overlayClassName={{
				base: classNames(cl.overlay, cl[`overlay-${type}`]),
				afterOpen: cl['overlay-after-open'],
				beforeClose: cl['overlay-before-close'],
			}}
			className={cl.body}
			isOpen={isOpen}
			closeTimeoutMS={300}
			onRequestClose={onClose}
			aria={{ labelledby: aria?.labelledby, describedby: aria?.describedby }}
			contentLabel={aria?.label}
		>
			{children}
		</ReactModal>
	);
};

export default Modal;
