import { InferType } from 'yup';
import { postSchema, postsResponseSchema, postsSchema } from '@/schemas/postsSchemas';

export type Post = InferType<typeof postSchema>;
export type Posts = InferType<typeof postsSchema>;
export type PostsResponse = InferType<typeof postsResponseSchema>;
