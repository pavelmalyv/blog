import { successResponseSchema } from '@/schemas/responsesSchemas';
import { InferType } from 'yup';

export type SuccessResponseSchema = InferType<typeof successResponseSchema>;
