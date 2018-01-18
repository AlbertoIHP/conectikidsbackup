import { base } from './base'
import axios from 'axios'

class ForgotPasswordService {

	sendMail ( email )
	{
		let body = { email: email, access_token: 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'}
	
		body = JSON.stringify( body )

		let headers = {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'}


		let http = axios.create({
		  baseURL: base.api,
		  headers: headers,

		})

		return http.post('password-resets', body);

	}

}


export default ForgotPasswordService;
