import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class UserService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('users')
			
			console.log( response )

			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	show = async function ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('users/'+id)
			
			console.log(response)

			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, user, token )
	{
		user.password = user.password.toLowerCase()

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('users/'+id, body: user)

			console.log(response)
			socket.emit( 'userUpdated', JSON.stringify( user ) )	
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	destroy = async function ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.delete('users/'+id)
			
			console.log(response)
			socket.emit( 'userDeleted', JSON.stringify( user ) )	

			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( user )
	{
		user.email = user.email.toLowerCase()
		user.password = user.password.toLowerCase()
		user.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.post( 'users', body: JSON.stringify( user ) )
			
			console.log(response)
			socket.emit( 'userAdded', JSON.stringify( user ) )	
						
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const userService = new UserService()