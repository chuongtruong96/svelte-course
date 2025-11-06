import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	const segments = param.split('/').filter(Boolean);
	return segments.length >= 2;
}) satisfies ParamMatcher;
