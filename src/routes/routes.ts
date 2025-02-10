import type { BlogUrl } from '../types/routes';

export const blogUrl: BlogUrl = {
	base: '/',
	post: (id) => `/blog/${id}`,
	pagination: (page) => `/blog/page/${page}/`,
};
