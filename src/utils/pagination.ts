export const getPages = (limit: number, total: number) => {
	return Math.ceil(total / limit);
};
