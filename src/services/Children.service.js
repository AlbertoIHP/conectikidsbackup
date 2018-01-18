import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class ChildrenService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('childrens')
			
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
			let response = await http.get('childrens/'+id)
			
			console.log( response )
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, children, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('childrens/'+id, body: children)
			
			console.log( response )
			socket.emit( 'childrenUpdated', JSON.stringify( children ) )	
			
			
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
			let response = await http.delete('childrens/'+id)
			
			console.log( response )
			socket.emit( 'childrenDeleted', JSON.stringify( children ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( children )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.post( 'childrens', body: JSON.stringify( children ) )
			
			console.log( response )
			socket.emit( 'childrenAdded', JSON.stringify( children ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const childrenService = new ChildrenService()