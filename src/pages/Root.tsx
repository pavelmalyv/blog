import { Outlet } from 'react-router';

interface RootProps {
	children?: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
	return <main className="main">{children || <Outlet />}</main>;
};

export default Root;
