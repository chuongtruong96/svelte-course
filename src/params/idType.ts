import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): boolean => {
	return /^\d+$/.test(param);
}) satisfies ParamMatcher;
