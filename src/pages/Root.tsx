import { Outlet } from 'react-router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

interface RootProps {
	children?: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
	return (
		<>
			<Header />

			<main className="main">{children || <Outlet />}</main>

			<Footer />
		</>
	);
};

export default Root;
