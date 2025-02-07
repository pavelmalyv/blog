import { number, object } from 'yup';

export const paginationResponseSchema = object({
	limit: number().required(),
	skip: number().required(),
	total: number().required(),
});
