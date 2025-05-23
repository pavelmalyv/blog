import classNames from 'classnames';
import cl from './CookieModal.module.scss';
import Button from '@components/UI/Buttons/button/Button';
import ButtonIcon from '@components/UI/Buttons/buttonIcon/ButtonIcon';
import Modal from '@/components/UI/modal/Modal';

import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router';
import { boolean, date, InferType, object } from 'yup';
import { cookiesUrl } from '@/routes/routes';

const cookieAcceptSchema = object({
	accept: boolean().required(),
	end: date().required(),
});

type CookieAccept = InferType<typeof cookieAcceptSchema>;

const setCookieAccept = () => {
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + 14);

	const cookieAccept: CookieAccept = {
		accept: true,
		end: endDate,
	};

	localStorage.setItem('cookie-accept', JSON.stringify(cookieAccept));
};

const getCookieAccept = async () => {
	const cookieLocalStorage = localStorage.getItem('cookie-accept');
	if (!cookieLocalStorage) {
		return false;
	}

	try {
		const cookieLocalStorageObj = JSON.parse(cookieLocalStorage);
		const cookieAccept = await cookieAcceptSchema.validate(cookieLocalStorageObj);
		const currentDate = new Date();
		const endDate = new Date(cookieAccept.end);

		return cookieAccept.accept && currentDate < endDate;
	} catch (error) {
		console.error(error);
		console.error('The "cookie-accept" parameter of the local storage has been cleared');
		localStorage.removeItem('cookie-accept');

		return false;
	}
};

const CookieModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		(async () => {
			const isCookieAccept = await getCookieAccept();
			if (isCookieAccept) {
				return;
			}

			setIsOpen(true);
		})();
	}, []);

	const handleClose = () => {
		setIsOpen(false);
		setCookieAccept();
	};

	const titleId = useId();

	return (
		<Modal
			type="dialog"
			role="alertdialog"
			isOpen={isOpen}
			onClose={handleClose}
			aria={{ labelledby: titleId }}
			className={{
				overlay: cl.overlay,
				body: cl.body,
			}}
		>
			<h2 id={titleId} className={classNames('h2', cl.title)}>
				Cookie
			</h2>

			<div className={cl.close}>
				<ButtonIcon icon="close" hiddenName="Close" onClick={handleClose} />
			</div>

			<div className={cl.bottom}>
				<div className={cl.description}>
					This site uses cookies to improve your experience. See our{' '}
					<Link to={cookiesUrl} className="link">
						Cookie Policy
					</Link>{' '}
					for details.
				</div>

				<Button onClick={handleClose}>Accept</Button>
			</div>
		</Modal>
	);
};

export default CookieModal;
