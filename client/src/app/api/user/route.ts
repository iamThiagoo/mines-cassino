import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { name } = await request.json();
		const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/user`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: name.trim() }),
		});
		const data = await response.json();
		if (!response.ok) {
			return NextResponse.json(
				{ message: data.message || 'Error.' },
				{ status: response.status }
			);
		}
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal error.' },
			{ status: 500 }
		);
	}
}