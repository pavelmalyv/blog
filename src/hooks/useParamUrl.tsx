import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const useParamUrl = (param: string, acceptableValues: string[], urlKeys: string[]) => {
	const acceptableParam = acceptableValues.find((value) => value === param);

	const searchParamsArray = useSearchParams();
	const setSearchParams = searchParamsArray[1];

	useEffect(() => {
		if (acceptableParam) {
			return;
		}

		setSearchParams(
			(prev) => {
				urlKeys.forEach((key) => {
					prev.delete(key);
				});

				return prev;
			},
			{ replace: true },
		);
	}, [acceptableParam, setSearchParams, urlKeys]);

	const setParamsUrl = (value: string, setValues: { key: string; value: string }[]) => {
		setSearchParams(
			(prev) => {
				setValues.forEach((item) => {
					if (value == acceptableValues[0]) {
						prev.delete(item.key);
					} else {
						prev.set(item.key, item.value);
					}
				});

				return prev;
			},
			{ replace: true },
		);
	};

	return [acceptableParam, setParamsUrl] as const;
};

export default useParamUrl;
