export const MESSAGES = {
	postsEmpty: 'No posts found',
	postsNotFound: (query: string) => `No results were found for the query "${query}"`,
	postsFound: (query: string, quantity: number) => {
		const postWord = quantity === 1 ? 'post' : 'posts';
		const verb = quantity === 1 ? 'was' : 'were';
		return `For the query "${query}", ${quantity} ${postWord} ${verb} found`;
	},
	postsLoading: 'Loading posts...',
	postLoading: 'Loading post...',
	authorLoading: 'Loading author...',
	authorPostsLoading: "Loading author's posts...",
	titleLoading: 'Loading title...',
};
