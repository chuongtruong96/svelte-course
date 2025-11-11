import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { requireLogin } from '$lib/server/auth';
import { parse } from 'cookie';

export const load = (async () => {
	const session = requireLogin();
	console.log(session.user);

	return {};
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ request, cookies, locals }) => {
		try {
			const res = await auth.api.signOut({
				headers: request.headers,
				asResponse: true
			});
			const setCookieHeader = res.headers.get('set-cookie');
			if (res.status === 200 && setCookieHeader) {
				const parsedCookie = parse(setCookieHeader);
				const name = Object.keys(parsedCookie)[0];
				cookies.delete(name, {
					path: '/'
				});
				locals.session = null;
			} else {
				return fail(400, { message: 'Error signing out.' });
			}
		} catch {
			return fail(400, { message: 'Error signing out.' });
		}
		redirect(303, '/signin');
	}
};
