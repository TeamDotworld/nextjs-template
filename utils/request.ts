/**
 :: Request network request tool.
    More detailed api documentation: https://github.com/umijs/umi-request.
    Adapted from ant-design-pro
 */
	import { extend } from "umi-request";
	import { notification } from "antd";
	
	const codeMessage: any = {
		200: "The server successfully returned the requested data.",
		201: "The new or modified data was successful.",
		202: "A request has entered the background queue (asynchronous task).",
		204: "The deletion of data was successful.",
		400: "There was an error in the request and the server did not take action to create or modify the data.",
		401: "The user does not have permissions (token, user name, password error).",
		403: "Users are authorized, but access is prohibited.",
		404: "Requests are made for records that do not exist and the server does not operate.",
		406: "The format of the request is not available.",
		410: "The requested resource is permanently deleted and is no longer available.",
		422: "When an object is created, a validation error occurs.",
		500: "There is an error with the server, please check the server.",
		502: "Gateway error.",
		503: "The service is not available, the server is temporarily overloaded or maintained.",
		504: "The gateway timed out.",
	};
	
	/**
	:: Exception handler.
	*/
	const errorHandler = (error: { response: Response }): Response => {
		const { response } = error;
		if (response && response.status) {
			const errorText: string =
				codeMessage[response.status] || response.statusText;
			const { status, url } = response;
	
			notification.error({
				message: `Request error ${status}: ${url}`,
				description: errorText,
			});
		} else if (!response) {
			notification.error({
				description:
					"Your network has an exception and cannot connect to the server",
				message: "Network anomaly",
			});
		}
		return response;
	};
	
	/**
	 Configure the default parameters for request requests.
	*/
	const request = extend({
		errorHandler, // Default error handling.
		// headers: {
		// 	Authorization: `Bearer ${localStorage.getItem("access_token")}`,
		// },
		//credentials: "include",
	});
	
	export default request;
	