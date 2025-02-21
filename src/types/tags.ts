import { InferType } from 'yup';
import { tagsSchema } from '@/schemas/tagsSchemas';

export type Tags = InferType<typeof tagsSchema>;
