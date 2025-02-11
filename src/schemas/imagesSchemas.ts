import { number, object, string } from 'yup';

export const imageSchema = object({
	src: string().required(),
	webp: string().required(),
	width: number().required(),
	height: number().required(),
	alt: string(),
});
