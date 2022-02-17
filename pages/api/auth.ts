// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'




import request from "../../utils/request";



const HOST = process.env.REACT_APP_API_HOST;

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
	return request(`${HOST}/api/v1/auth/reset`, {
		method: "POST",
		data: {
			email
		}
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
}
