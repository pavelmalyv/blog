import cl from './VisuallyHiddenLoader.module.scss';

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
		<span id={id} className={cl.body} aria-busy={isFetching}>
			<span className="visually-hidden" role={isRoleStatus ? 'status' : undefined}>
				{isFetching && hiddenMessage}
			</span>

			{children}
		</span>
	);
};

export default VisuallyHiddenLoader;
