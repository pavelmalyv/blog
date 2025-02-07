import { string, object, array } from 'yup';
import { tagsSchema } from './tagsSchemas';
import { paginationResponseSchema } from './responsesSchemas';

export const postSchema = object({
	id: string().required(),
	title: string().required(),
	body: string().required(),
	tags: tagsSchema,
	userId: string().required(),
	createdAt: string().required(),
});

export const postsSchema = array().of(postSchema).required();

export const postsResponseSchema = paginationResponseSchema.shape({
	posts: postsSchema,
});
