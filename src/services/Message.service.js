import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class MessageService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('messages')
			
			console.log(response)			
			
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
			let response = await http.get('messages/'+id)
			
			console.log(response)			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, message, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('messages/'+id, body: message)
			
			console.log(response)
			socket.emit( 'messageUpdated', JSON.stringify( message ) )	
			
			
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
			let response = await http.delete('messages/'+id)
			
			console.log(response)
			socket.emit( 'messageDeleted', JSON.stringify( message ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( message )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		message.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		try
		{
			let response = await http.post( 'messages', body: JSON.stringify( message ) )
			
			console.log( response )
			socket.emit( 'messageAdded', JSON.stringify( message ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const messageService = new MessageService()