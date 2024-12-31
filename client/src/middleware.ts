import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";
import { jwtDecode } from 'jwt-decode';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token && request.nextUrl.pathname == '/') return NextResponse.next();

    if (!token && request.nextUrl.pathname !== '/')
        return NextResponse.redirect(new URL('/', request.url));

    try {
        const decoded = jwtDecode(token as string);
        const currentTime = Date.now() / 1000;

        if (decoded && decoded.exp && decoded.exp < currentTime) {
            request.cookies.delete('token');
            request.cookies.delete('balance');
            request.cookies.delete('userId');
            request.cookies.delete('username');   
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (!decoded) {
            console.warn('Token inválido.');
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (request.nextUrl.pathname === '/') {
            return NextResponse.rewrite(new URL('/game', request.url));
        }

        return NextResponse.next();   
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};