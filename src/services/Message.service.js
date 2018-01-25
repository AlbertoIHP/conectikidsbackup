import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class MessageService {

	index( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('messages')
			

	}

	show( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('messages/'+id)
			

	}

	update( id, message, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('messages/'+id,  message)
			

	}

	destroy( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.delete('messages/'+id)
			

	}


	store( message )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		message.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		return http.post( 'messages', JSON.stringify( message ) )
	}


	getMessagesByCourseId( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('messages/getmessagesbycourseid/'+id)
			

	}
}

export const messageService = new MessageService();

