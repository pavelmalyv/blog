interface HiddenLoadingProps {
	isFetching: boolean;
	children: React.ReactNode;
	hiddenMessage?: string;
	isRoleStatus?: boolean;
	id?: string;
}

const HiddenLoading = ({
	isFetching,
	children,
	hiddenMessage = 'Loading...',
	isRoleStatus = true,
	id,
}: HiddenLoadingProps) => {
	return (
		<div id={id} aria-busy={isFetching}>
			<span className="visually-hidden" role={isRoleStatus ? 'status' : undefined}>
				{isFetching && hiddenMessage}
			</span>

			{children}
		</div>
	);
};

export default HiddenLoading;
