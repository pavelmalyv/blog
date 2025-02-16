import cl from './Text.module.scss';

interface TextProps {
	children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
	return <div className={cl.text}>{children}</div>;
};

interface SkeletonProps {
	children: React.ReactNode;
}

const Skeleton = ({ children }: SkeletonProps) => {
	return <div className={cl.skeleton}>{children}</div>;
};

Text.Skeleton = Skeleton;

export default Text;
