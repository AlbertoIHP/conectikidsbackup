import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class TaskService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('tasks')
			
			console.log(response)	
			
			
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
			let response = await http.get('tasks/'+id)
			
			console.log(response)
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, task, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.put('tasks/'+id, body: task)
			
			console.log(response)
			socket.emit( 'taskUpdated', JSON.stringify( task ) )	
			
			
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
			let response = await http.delete('tasks/'+id)
			
			console.log(response)
			socket.emit( 'taskDeleted', JSON.stringify( task ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( task )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		task.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		try
		{
			let response = await http.post( 'tasks', body: JSON.stringify( task ) )
			
			console.log(response)
			socket.emit( 'taskAdded', JSON.stringify( task ) )	
			
			
			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const taskService = new TaskService()