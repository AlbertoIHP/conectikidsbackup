import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class GardenService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('gardens')
			

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('gardens/'+id)

	}

	update ( id, garden, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('gardens/'+id, garden)
			

	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.delete('gardens/'+id)
			

	}


	store ( garden )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		garden.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		return http.post( 'gardens',  JSON.stringify( garden ) )
			


	}

}


export default GardenService