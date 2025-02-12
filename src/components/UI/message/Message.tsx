import cl from './Message.module.scss';

interface MessageProps {
	message: string;
}

const Message = ({ message }: MessageProps) => {
	return <div className={cl.message}>{message}</div>;
};

export default Message;
