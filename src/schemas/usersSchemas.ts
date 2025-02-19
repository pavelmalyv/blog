import { object, string } from 'yup';
import { imageSchema } from './imagesSchemas';

export const userSchema = object({
	id: string().required(),
	firstName: string().required(),
	lastName: string().required(),
	image: imageSchema.required(),
	description: string().required(),
	skills: string().required(),
	experience: string().required(),
});
