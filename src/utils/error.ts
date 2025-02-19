const NOT_FOUND_RESPONSE = new Response('Not Found', { status: 404 });

export const throwNotFoundIfInvalid = (id: string | undefined) => {
	if (!id) {
		throw NOT_FOUND_RESPONSE;
	}

	return id;
};
