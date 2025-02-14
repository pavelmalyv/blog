import type { PostsResponse } from '../types/posts';
import type { SortOrder } from '../types/api';

import { postsResponseSchema } from '../schemas/postsSchemas';
import { apiSlice } from './apiSlice';

interface GetPostsParams {
	limit: number;
	skip: number;
	sortBy?: string;
	order?: SortOrder;
	search?: string;
}

// адаптация публичного api под проект
const addAdditionalFieldsPost = (post: unknown) => {
	const colors = ['00605E', '006992', '5D5D5D'];

	if (typeof post == 'object' && post !== null && 'id' in post && typeof post.id === 'number') {
		//createdAt
		const date = new Date('2023.10.01');
		date.setDate(date.getDate() + post.id * 2);
		const createdAt = date.toISOString();

		//image
		const colorImage = colors[post.id % colors.length];
		const image = {
			src: `https://dummyjson.com/image/960x600/${colorImage}/ffffff?text=Blog+%23${post.id}&fontFamily=poppins&type=jpg`,
			webp: `https://dummyjson.com/image/960x600/${colorImage}/ffffff?text=Blog+%23${post.id}&fontFamily=poppins&type=webp`,
			width: 960,
			height: 600,
			alt: `Blog #${post.id}`,
		};

		return {
			...post,
			createdAt,
			image,
		};
	}

	return post;
};
//

const postsSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query<PostsResponse, GetPostsParams>({
			query: ({ limit, skip, sortBy, order, search }) => {
				const url = search ? '/posts/search' : '/posts';

				return {
					url,
					params: {
						limit,
						skip,
						sortBy,
						order,
						q: search,
					},
				};
			},
			transformResponse: async (response: unknown) => {
				const colors = ['00605E', '006992', '5D5D5D'];

				// добавить свойства "createdAt", "image" в объект ответа сервера
				if (
					typeof response === 'object' &&
					response !== null &&
					'posts' in response &&
					'total' in response &&
					Array.isArray(response.posts)
				) {
					const postsPerMonth = Math.ceil(Number(response.total) / 12);

					response.posts = response.posts.map((post) => {
						return addAdditionalFieldsPost(post);
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
