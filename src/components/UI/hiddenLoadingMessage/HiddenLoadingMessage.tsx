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
		<div className="visually-hidden" role={isRoleStatus ? 'status' : undefined}>
			{isLoading && message}
		</div>
	);
};

export default HiddenLoadingMessage;
