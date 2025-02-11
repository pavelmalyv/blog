import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useValidatePaginationParam = (parameter: string | undefined, firstPageUrl: string) => {
	const navigate = useNavigate();

	let page: number | undefined;
	let isValid: boolean = true;

	if (!parameter) {
		page = 1;
	} else {
		const parameterNumber = Number(parameter);

		if (isNaN(parameterNumber) || parameterNumber <= 1) {
			page = undefined;
			isValid = false;
		} else {
			page = parameterNumber;
		}
	}

	useEffect(() => {
		if (!isValid) {
			navigate(firstPageUrl);
		}
	}, [isValid, navigate, firstPageUrl]);

	return [page, isValid] as const;
};
