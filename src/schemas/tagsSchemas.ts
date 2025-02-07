import { array, string } from 'yup';

export const tagsSchema = array().of(string().required()).required();
