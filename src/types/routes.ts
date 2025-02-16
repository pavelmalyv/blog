export type UrlPagination = (param: string | number) => string;
export type UrlPost = (param: string | number) => string;
export type UrlPageId = (param: string | number) => string;

export interface BlogUrl {
	base: string;
	post: UrlPageId;
	pagination: UrlPageId;
}

export interface AuthorUrl {
	profile: UrlPageId;
}
