import { string, object, array } from 'yup';
import { tagsSchema } from './tagsSchemas';
import { paginationResponseSchema } from './responsesSchemas';
import { imageSchema } from './imagesSchemas';

export const postSchema = object({
	id: string().required(),
	title: string().required(),
	body: string().required(),
	excerpt: string().required(),
	tags: tagsSchema,
	userId: string().required(),
	createdAt: string().required(),
	thumbnail: imageSchema.required(),
	image: imageSchema.required(),
});

export const postsSchema = array().of(postSchema).required();

export const postsResponseSchema = paginationResponseSchema.shape({
	posts: postsSchema,
});
