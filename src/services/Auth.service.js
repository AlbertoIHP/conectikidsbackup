import { base } from './base'
import axios from 'axios'

class AuthService {


	login = async function ( user )
	{



		user.email = user.email.toLowerCase()
		user.password = user.password.toLowerCase()

		bodyContent = JSON.stringify({ access_token: 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP' })


		let headers = { 
			Accept : 'application/json', 
			Content-Type : 'application/json', 
			Authorization: 'Basic ' + this.encode( user.email + ':' + user.password) }
		

		let http = axios.create({	
		  baseURL: base.api,
		  headers: headers
		})


		try
		{
			let response = await http.post('auth', body: bodyContent)
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

	encode = function( input )
	{
	   var keyStr: any = 'ABCDEFGHIJKLMNOP' +
	        'QRSTUVWXYZabcdef' +
	        'ghijklmnopqrstuv' +
	        'wxyz0123456789+/' +
	        '=';
	        var output: any = "";
	        var chr1: any, chr2: any, chr3: any = "";
	        var enc1: any, enc2, enc3: any, enc4: any = "";
	        var i: any = 0;

	        do {
	          chr1 = input.charCodeAt(i++);
	          chr2 = input.charCodeAt(i++);
	          chr3 = input.charCodeAt(i++);

	          enc1 = chr1 >> 2;
	          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	          enc4 = chr3 & 63;

	          if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	          } else if (isNaN(chr3)) {
	            enc4 = 64;
	          }

	          output = output +
	              keyStr.charAt(enc1) +
	              keyStr.charAt(enc2) +
	              keyStr.charAt(enc3) +
	              keyStr.charAt(enc4);
	          chr1 = chr2 = chr3 = "";
	          enc1 = enc2 = enc3 = enc4 = "";
	        } while (i < input.length);

	        return output;
	}



}


export const authService = new AuthService()