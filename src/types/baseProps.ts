export type BaseButton =
	| ({ to?: never } & React.ComponentProps<'button'>)
	| ({ to: string; disabled?: never; type?: never } & React.ComponentProps<'a'>);
