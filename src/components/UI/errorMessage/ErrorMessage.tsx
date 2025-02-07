import cl from './ErrorMessage.module.scss';

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return (
		<div role="alert" className={cl.message}>
			{message}
		</div>
	);
};

export default ErrorMessage;
