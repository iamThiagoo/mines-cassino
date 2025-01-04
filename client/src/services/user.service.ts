// src/services/userService.ts
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";

export const createUser = async (name: string): Promise<any> => {
	const nameFormat = name.trim();

	if (!nameFormat) {
		throw new Error("Nome de Usuário Inválido.");
	}

	const response = await fetch('/api/user', {
		method: "POST",
		headers: { "Content-Type": "application/json", "Accept": "application/json" },
		body: JSON.stringify({ name: nameFormat }),
	});

	const data = await response.json();
	const cookieOptions = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) };
	setCookie("userId", data.userId, cookieOptions);
	setCookie("balance", data.balance, cookieOptions);
	setCookie("username", data.username, cookieOptions);
	setCookie("token", data.access_token, cookieOptions);

	return data;
};

export const deleteUserAccount = async (): Promise<void> => {
	const userId = getCookie("userId");
	const token = getCookie("token");

	if (!userId || !token) {
		throw new Error("Usuário não autenticado ou dados faltando.");
	}

	const response = await fetch(`/api/user/${userId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Erro ao deletar conta.");
	}

	["userId", "balance", "username", "token"].forEach((cookie) => deleteCookie(cookie));
	return;
};