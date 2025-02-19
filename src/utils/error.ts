import { number, object } from 'yup';

const NOT_FOUND_RESPONSE = new Response('Not Found', { status: 404 });

export const throwNotFoundIfInvalid = (id: string | undefined) => {
	if (!id) {
		throw NOT_FOUND_RESPONSE;
	}

	return id;
};

const errorSchema = object({
	status: number().required(),
});

export const throwNotFoundIfStatus = (error: unknown) => {
	if (!errorSchema.isValidSync(error)) {
		return;
	}

	if (error.status === 404) {
		throw NOT_FOUND_RESPONSE;
	}
};
