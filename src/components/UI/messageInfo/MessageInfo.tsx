import cl from './MessageInfo.module.scss';

interface MessageProps {
	message: string;
}

const MessageInfo = ({ message }: MessageProps) => {
	return <div className={cl.message}>{message}</div>;
};

export default MessageInfo;
