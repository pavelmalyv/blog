interface getDisplayDateOptions {
	weekday?: boolean;
}

export const getDisplayDate: (date: string, options?: getDisplayDateOptions) => string = (
	date,
	options = {},
) => {
	const dateConstructor = new Date(date);

	const displayDate = dateConstructor.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});

	if (options.weekday) {
		const weekday = dateConstructor.toLocaleDateString('en-GB', {
			weekday: options.weekday ? 'long' : undefined,
		});

		return `${weekday}, ${displayDate}`;
	}

	return displayDate;
};
