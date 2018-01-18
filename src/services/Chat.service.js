import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class ChatService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('chats')
			
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
			let response = await http.get('chats/'+id)
			
			console.log( response )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, chat, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('chats/'+id, body: chat)
			
			console.log( response )
			socket.emit( 'chatUpdated', JSON.stringify( chat ) )	
			
			
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
			let response = await http.delete('chats/'+id)
			
			console.log( response )
			socket.emit( 'chatDeleted', JSON.stringify( chat ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( chat )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		chat.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		try
		{
			let response = await http.post( 'chats', body: JSON.stringify( chat ) )
			
			console.log( response )
			socket.emit( 'chatAdded', JSON.stringify( chat ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const chatService = new ChatService()