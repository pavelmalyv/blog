import classNames from 'classnames';
import cl from './Modal.module.scss';
import ReactModal from 'react-modal';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import { createCompoundContext } from '../../../context/createCompoundContext';

interface createCompoundContextType {
	onClose: () => void;
}

const [useModalContext, ModalProvider] = createCompoundContext<createCompoundContextType>();

interface ModalProps {
	type?: 'full' | 'popup';
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
		<ModalProvider value={{ onClose: onClose }}>
			<ReactModal
				bodyOpenClassName={cl['body-open']}
				overlayClassName={{
					base: classNames(cl.overlay, cl[`overlay_${type}`]),
					afterOpen: cl['overlay_after-open'],
					beforeClose: cl['overlay_before-close'],
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
