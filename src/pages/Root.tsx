import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import CookieModal from '@components/Modals/cookieModal/CookieModal';
import { Outlet } from 'react-router';

interface RootProps {
	children?: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
	return (
		<>
			<Header />
			<CookieModal />

			<main className="main">{children || <Outlet />}</main>

			<Footer />
		</>
	);
};

export default Root;
