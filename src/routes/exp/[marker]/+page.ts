import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const loc = params.marker
    return { loc };
}) satisfies PageLoad;