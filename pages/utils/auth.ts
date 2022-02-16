import jwt from "jsonwebtoken";


export interface IPayload {
	id: string;
	role: string;
	name: string;
}

export function isAuthenticated(): boolean {
	if (typeof window !== "undefined") {
		let pk = localStorage.getItem("pk");
			let access_token = localStorage.getItem("access_token");
	
			if (!pk || !access_token) {
				return false;
			}

			let data = jwt.decode(access_token);

			if (data) return true;

			return false;
	}
	else return false

}

export function decodePayload(): IPayload | null {
	let token = localStorage.getItem("access_token");
	if (token === null) {
		return null;
	}
	return jwt.decode(token) as IPayload;
}


