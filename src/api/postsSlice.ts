import { postsResponseSchema } from '../schemas/postsSchemas';
import type { PostsResponse } from '../types/posts';
import { apiSlice } from './apiSlice';

const postsSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query<PostsResponse, void>({
			query: () => ({
				url: '/posts',
			}),
			transformResponse: async (response: unknown) => {
				// добавить свойство "createdAt" в объект ответа сервера
				if (
					typeof response === 'object' &&
					response !== null &&
					'posts' in response &&
					'total' in response &&
					Array.isArray(response.posts)
				) {
					const postsPerMonth = Math.ceil(Number(response.total) / 12);

					response.posts = response.posts.map((post) => {
						if (typeof post == 'object' && post !== null && 'id' in post) {
							const month = Math.ceil(post.id / postsPerMonth);
							const indexInMonth = post.id - (month - 1) * postsPerMonth;
							const day = Math.ceil((indexInMonth * 28) / postsPerMonth);
							const createdAt = new Date(2024, month - 1, day).toISOString();

							return {
								...post,
								createdAt,
							};
						}

						return post;
					});
				}
				//

				const result = await postsResponseSchema.validate(response);
				return result;
			},
		}),
	}),
});

export const { useGetPostsQuery } = postsSlice;
