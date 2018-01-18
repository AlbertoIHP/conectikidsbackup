import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class ChildrenService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('childrens')
			

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('childrens/'+id)
			

	}

	update ( id, children, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.put('childrens/'+id, children)
			

	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.delete('childrens/'+id)
			

	}


	store ( children )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		children.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'


		return http.post( 'childrens', JSON.stringify( children ) )
			


	}

}


export default ChildrenService