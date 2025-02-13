import { useEffect, useState } from 'react';

const useDelayAnimationLoading = (isLoading: boolean) => {
	const [isLoadingDelay, setIsLoadingDelay] = useState(isLoading);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (isLoading) {
			timer = setTimeout(() => setIsLoadingDelay(true), 300);
		} else {
			setIsLoadingDelay(false);
		}

		return () => clearTimeout(timer);
	}, [isLoading]);

	return isLoadingDelay;
};

export default useDelayAnimationLoading;
