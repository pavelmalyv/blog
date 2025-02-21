import { string, object, array } from 'yup';
import { tagsSchema } from '@/schemas/tagsSchemas';
import { paginationResponseSchema } from '@/schemas/responsesSchemas';
import { imageSchema } from '@/schemas/imagesSchemas';

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
