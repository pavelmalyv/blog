import { object, string } from 'yup';

export const userSchema = object({
	id: string().required(),
	firstName: string().required(),
	lastName: string().required(),
});
