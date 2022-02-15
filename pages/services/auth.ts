import request from "../utils/request";

// const { REACT_APP_API_HOST: HOST } = process.env;

const HOST = "http://192.168.1.174:8000";

export interface LoginParamsType {
	email: string;
	password: string;
}

export async function loginApi({ email, password }: LoginParamsType) {
	return request(`${HOST}/api/v1/auth`, {
		method: "POST",
		data: {
			email,
			password,
		},
	});
}

export function getPk(access_token: string) {
	return request(`${HOST}/api/v1/auth/pk`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
}

export function sendResetEmailLink(email: string) {
	return request(`${HOST}/api/v1/auth/magic?email=${email}`, {
		method: "GET"
	})
}

export function exchangeMagicToken(token: string) {
	return request(`${HOST}/api/v1/auth/magic/exchange`, {
		method: "POST",
		data: {
			token
		}
	})
}

export function generateAssertion(email: string) {
	return request(`${HOST}/api/v1/auth/webauthn/challenge?email=${email}`, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access_token')
		}
	})
}

export function verifyAttestation(data: object) {
	return request(`${HOST}/api/v1/auth/webauthn`, {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access_token')
		},
		data: JSON.stringify(data)
	})
	// localStorage.setItem("access_token",access_token)
}