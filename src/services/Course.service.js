import { base } from './base'
import { socket } from './socket'
import axios from 'axios'
class CourseService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('courses')
			
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
			let response = await http.get('courses/'+id)
			
			console.log( response )			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, course, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('courses/'+id, body: course)
			
			console.log( response )
			socket.emit( 'courseUpdated', JSON.stringify( course ) )	
			
			
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
			let response = await http.delete('courses/'+id)
			
			console.log( response )
			socket.emit( 'courseDeleted', JSON.stringify( course ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( course )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.post( 'courses', body: JSON.stringify( course ) )
			
			console.log( response )
			socket.emit( 'courseAdded', JSON.stringify( course ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const courseService = new CourseService()