import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class GardenService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('gardens')
			
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
			let response = await http.get('gardens/'+id)
			
			console.log( response )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, garden, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('gardens/'+id, body: garden)
			
			console.log( response )
			socket.emit( 'gardenUpdated', JSON.stringify( garden ) )	
			
			
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
			let response = await http.delete('gardens/'+id)
			
			console.log( response )
			socket.emit( 'gardenDeleted', JSON.stringify( garden ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( garden )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.post( 'gardens', body: JSON.stringify( garden ) )
			
			console.log( response )
			socket.emit( 'gardenAdded', JSON.stringify( garden ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const gardenService = new GardenService()