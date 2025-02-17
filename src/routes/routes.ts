import type { BlogUrl, AuthorUrl } from '../types/routes';

export const blogUrl: BlogUrl = {
	base: '/',
	post: (id) => `/post/${id}`,
	pagination: (page) => `/page/${page}`,
};

export const authorUrl: AuthorUrl = {
	profile: (id) => `/author/${id}`,
};

export const policyUrl = '/policy';
