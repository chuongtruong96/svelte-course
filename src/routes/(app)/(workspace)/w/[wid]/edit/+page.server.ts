import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { zod4 } from 'sveltekit-superforms/adapters';
import { workspaceSchema } from '$lib/schemas/workspace-schema';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	// TODO: Auth: logged in and can update workspace
	const workspace = await db
		.select({
			name: workspaces.name
		})
		.from(workspaces)
		.where(eq(workspaces.id, params.wid));
	if (!workspace) error(404, 'Not found');
	return {
		form: await superValidate(zod4(workspaceSchema))
	};
}) satisfies PageServerLoad;
