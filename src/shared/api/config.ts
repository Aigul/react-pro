import { fetchBaseQuery } from '@reduxjs/toolkit/query';

type StateWithUser = {
	user: { accessToken: string };
};

export const customBaseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as StateWithUser).user.accessToken;

		if (accessToken) {
			headers.set('authorization', accessToken);
		}
		return headers;
	},
});
