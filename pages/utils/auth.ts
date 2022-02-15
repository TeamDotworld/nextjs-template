import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { getPk } from "../services/auth";

export interface IPayload {
	id: string;
	role: string;
	name: string;
}

export function isAuthenticated(): boolean {
	if (typeof window !== "undefined") {
		// browser code
		// console.log(window)
		// let pkvalue:string
		// let localpkvalue = window.localStorage.setItem("pk",pkvalue);
		
		let pk = localStorage.getItem("pk");
			let access_token = localStorage.getItem("access_token");
	
			if (!pk || !access_token) {
				return false;
			}

			let data = jwt.decode(access_token);

			if (data) return true;

			return false;
		} else return false
}

export function decodePayload(): IPayload | null {
	let token = localStorage.getItem("access_token");
	if (token === null) {
		return null;
	}
	return jwt.decode(token) as IPayload;
}


