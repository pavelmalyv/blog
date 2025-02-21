import { successResponseSchema } from '@/schemas/responsesSchemas';
import { SuccessResponseSchema } from '@/types/response';
import { apiSlice } from '@/api/apiSlice';

const formsSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		sendNewsletters: build.mutation<SuccessResponseSchema, string>({
			query: (email) => ({
				url: '/http/200',
				method: 'POST',
				body: {
					email,
				},
			}),
			transformResponse: (response) => {
				return successResponseSchema.validate(response);
			},
		}),
	}),
});

export const { useSendNewslettersMutation } = formsSlice;
