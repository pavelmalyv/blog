import { useLocation } from 'react-router';

export const useActiveNav = (base: string, patch: string) => {
	const location = useLocation();
	return location.pathname === base || location.pathname.startsWith(patch);
};
