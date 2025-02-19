interface HiddenLoadingMessageProps {
	isLoading: boolean;
	message?: string;
	isRoleStatus?: boolean;
}

const HiddenLoadingMessage = ({
	isLoading,
	message = 'Loading...',
	isRoleStatus = true,
}: HiddenLoadingMessageProps) => {
	return (
		<span className="visually-hidden" role={isRoleStatus ? 'status' : undefined}>
			{isLoading && message}
		</span>
	);
};

export default HiddenLoadingMessage;
