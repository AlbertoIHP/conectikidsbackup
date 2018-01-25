import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class ChatService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('chats')
			
			

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('chats/'+id)
			

	}

	update ( id, chat, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.put('chats/'+id, chat)
			

	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.delete('chats/'+id)

	}


	store ( chat )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		chat.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'


		return http.post( 'chats', JSON.stringify( chat ) )

	}

	getChatsByCourseId( id, token)
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('chats/getchatsbycourseid/'+id)		
	}

}

export const chatService = new ChatService();
