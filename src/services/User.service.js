import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class UserService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('users')

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('users/'+id)

	}
	curentUser ( token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('users/me')

	}

	update ( id, user, token )
	{
		user.password = user.password.toLowerCase()

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('users/'+id, user)


	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.delete('users/'+id)


	}


	store ( user )
	{
		user.email = user.email.toLowerCase()
		user.password = user.password.toLowerCase()
		user.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.post( 'users', JSON.stringify( user ) )



	}

}


export const userServices = new UserService();
