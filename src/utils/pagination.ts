export const getPages = (limit: number, total: number) => {
	return Math.ceil(total / limit);
};

export const getSkip = (page: number | undefined, limit: number) => {
	return page ? (page - 1) * limit : 0;
};
