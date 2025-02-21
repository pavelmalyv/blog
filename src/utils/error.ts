import { number, object } from 'yup';

export class NotFoundError extends Error {
	constructor(message = 'Not Found') {
		super(message);
		this.name = 'NotFoundError';
	}
}

export const requiredParamOrThrow = (param: string | undefined) => {
	if (!param) {
		throw new NotFoundError();
	}

	return param;
};

const errorSchema = object({
	status: number().required(),
});

export const checkStatusOrThrow = (error: unknown) => {
	if (!errorSchema.isValidSync(error)) {
		return;
	}

	if (error.status === 404 || error.status === 400) {
		throw new NotFoundError();
	}
};
