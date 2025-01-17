import { NextResponse } from "next/server";

interface RouteParams {
	params: { id: string };
}

export async function DELETE(
	request: Request,
	context: any
) {
	try {
		const { params } = context;
		const authHeader = request.headers.get('authorization');
		if (!authHeader) {
			return NextResponse.json(
				{ message: 'Unathorized.' },
				{ status: 401 }
			);
		}
		const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/user/${params.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': authHeader,
			},
		});
		if (!response.ok) {
			return NextResponse.json(
				{ message: 'Error.' },
				{ status: response.status }
			);
		}
		return NextResponse.json({ message: 'Deleted account.' });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal error.' },
			{ status: 500 }
		);
	}
}