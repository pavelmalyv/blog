import type { User } from '../types/users';
import { apiSlice } from './apiSlice';
import { userSchema } from '../schemas/usersSchemas';

const usersSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getUserById: build.query<User, string>({
			query: (id) => `user/${id}`,
			transformResponse: async (response: unknown) => {
				return userSchema.validate(response);
			},
		}),
	}),
});

export const { useLazyGetUserByIdQuery } = usersSlice;
