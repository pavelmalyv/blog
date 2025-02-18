import { number, object, string } from 'yup';

export const paginationResponseSchema = object({
	limit: number().required(),
	skip: number().required(),
	total: number().required(),
});

export const successResponseSchema = object({
	status: number().oneOf([200]).required(),
	message: string().required(),
});
