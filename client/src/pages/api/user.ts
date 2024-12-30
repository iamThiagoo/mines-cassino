import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";

export const prerender = false;

export const POST: APIRoute = async({ request }) => {
    const { name } = await request.json();
    const response = await fetch(`${getSecret('NEST_API_URL')}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    return new Response(JSON.stringify(await response.json()), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
    });
}