export type UrlPagination = (param: string | number) => string;
export type UrlPost = (param: string | number) => string;

export interface BlogUrl {
	base: string;
	post: UrlPost;
	pagination: UrlPagination;
}

export interface AuthorUrl {
	profile: UrlPost;
}
