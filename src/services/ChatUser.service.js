import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class ChatUserService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('chatsusers')
			
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
			let response = await http.get('chatsusers/'+id)
			
			console.log( response )
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, chatuser, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('chatsusers/'+id, body: chatuser)
			
			console.log( response )
			socket.emit( 'chatUserUpdated', JSON.stringify( chatuser ) )	
			
			
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
			let response = await http.delete('chatsusers/'+id)
			
			console.log( response )
			socket.emit( 'chatUserDeleted', JSON.stringify( chatuser ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( chatuser )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		chatuser.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		try
		{
			let response = await http.post( 'chatsusers', body: JSON.stringify( chatuser ) )
			
			console.log( response )
			socket.emit( 'chatUserAdded', JSON.stringify( chatuser ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const chatUserService = new ChatUserService()