import classNames from 'classnames';
import cl from './Modal.module.scss';
import ReactModal from 'react-modal';
import ButtonIcon from '@components/UI/buttonIcon/ButtonIcon';
import { createCompoundContext } from '@/context/createCompoundContext';

interface createCompoundContextType {
	onClose: () => void;
}

const [useModalContext, ModalProvider] = createCompoundContext<createCompoundContextType>();

interface ModalProps {
	role?: string;
	type?: 'full' | 'popup' | 'dialog';
	isOpen: boolean;
	children: React.ReactNode;
	className?: {
		overlay?: string;
		body?: string;
	};
	aria?: {
		label?: string;
		labelledby?: string;
		describedby?: string;
	};
	onClose: () => void;
}

const Modal = ({
	role = 'dialog',
	type = 'full',
	isOpen,
	children,
	className,
	aria,
	onClose,
}: ModalProps) => {
	return (
		<ModalProvider value={{ onClose: onClose }}>
			<ReactModal
				role={role}
				bodyOpenClassName={type !== 'dialog' ? cl['body-open'] : null}
				shouldCloseOnOverlayClick={type !== 'dialog'}
				overlayClassName={{
					base: classNames(cl.overlay, cl[`overlay_${type}`], className?.overlay),
					afterOpen: cl['overlay_after-open'],
					beforeClose: cl['overlay_before-close'],
				}}
				className={classNames(cl.body, className?.body)}
				isOpen={isOpen}
				closeTimeoutMS={300}
				onRequestClose={onClose}
				aria={{ labelledby: aria?.labelledby, describedby: aria?.describedby }}
				contentLabel={aria?.label}
			>
				{children}
			</ReactModal>
		</ModalProvider>
	);
};

interface DefaultHeadProps {
	title: string;
	idTitle?: string;
}

const Header = ({ title, idTitle }: DefaultHeadProps) => {
	const { onClose } = useModalContext();

	return (
		<>
			<div className={cl.close}>
				<ButtonIcon icon="close" hiddenName="Close" onClick={onClose} />
			</div>
			<div id={idTitle} className={classNames('h2', cl.title)}>
				{title}
			</div>
		</>
	);
};

Modal.Header = Header;

export default Modal;
