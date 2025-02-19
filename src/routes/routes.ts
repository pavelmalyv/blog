import type { BlogUrl, AuthorUrl } from '../types/routes';

export const blogUrl: BlogUrl = {
	base: '/',
	post: (id) => `/post/${id}`,
	pagination: (page) => `/page/${page}`,
};

export const authorUrl: AuthorUrl = {
	profile: (id) => `/author/${id}`,
	pagination: (id, page) => `/author/${id}/page/${page}`,
};

export const policyUrl = '/policy';
export const newslettersUrl = '/newsletters';
