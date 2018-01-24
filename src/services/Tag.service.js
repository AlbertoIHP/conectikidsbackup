import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class TagService {

	index( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('tags')

	}

	show( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('tags/'+id)


	}

	update( id, tag, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('tags/'+id,  tag)

	}

	destroy( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.delete('tags/'+id)


	}


	store( tag )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		tag.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		return http.post( 'tags', JSON.stringify( tag ) )
	}


}

export const tagService = new TagService();
