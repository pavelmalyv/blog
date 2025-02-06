import { Outlet } from 'react-router';
import Header from '../components/header/Header';

interface RootProps {
	children?: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
	return (
		<>
			<Header />

			<main className="main">{children || <Outlet />}</main>
		</>
	);
};

export default Root;
