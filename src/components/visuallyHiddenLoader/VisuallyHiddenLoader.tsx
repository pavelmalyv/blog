interface VisuallyHiddenLoaderProps {
	isFetching: boolean;
	children: React.ReactNode;
	hiddenMessage?: string;
	isRoleStatus?: boolean;
	id?: string;
}

const VisuallyHiddenLoader = ({
	isFetching,
	children,
	hiddenMessage = 'Loading...',
	isRoleStatus = true,
	id,
}: VisuallyHiddenLoaderProps) => {
	return (
		<div id={id} aria-busy={isFetching}>
			<span className="visually-hidden" role={isRoleStatus ? 'status' : undefined}>
				{isFetching && hiddenMessage}
			</span>

			{children}
		</div>
	);
};

export default VisuallyHiddenLoader;
