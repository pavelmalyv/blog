import { InferType } from 'yup';
import { userSchema } from '@/schemas/usersSchemas';

export type User = InferType<typeof userSchema>;
