import type { BlogUrl } from '../types/routes';

export const blogUrl: BlogUrl = {
	base: '/',
	post: (id) => `/post/${id}/`,
	pagination: (page) => `/page/${page}/`,
};
