import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class ChatUserService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('chatsusers')
			

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('chatsusers/'+id)
			

	}

	update ( id, chatuser, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('chatsusers/'+id, chatuser)
			

	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.delete('chatsusers/'+id)
			

	}


	store ( chatuser )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		chatuser.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'


		return http.post( 'chatsusers', JSON.stringify( chatuser ) )
			


	}

}


export default ChatUserService