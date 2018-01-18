import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class ActivityService {

	index = async function ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		try
		{
			let response = await http.get('activities')
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
			let response = await http.get('activities/'+id)
			
			console.log(response)

			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}

	update = async function ( id, activity, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		


		try
		{
			let response = await http.put('activities/'+id, body: activity)
			
			console.log(response)
			socket.emit( 'activityUpdated', JSON.stringify( activity ) )

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
			let response = await http.delete('activities/'+id)
			
			console.log(response)
			socket.emit( 'activityDeleted', JSON.stringify( activity ) )

			return response.json()
		}
		catch ( error )
		{
			return 401
		}
	}


	store = async function ( activity )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		activity.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		try
		{
			let response = await http.post( 'activities', body: JSON.stringify( activity ) )
		
			console.log(response)
			socket.emit( 'activityAdded', JSON.stringify( activity ) )

			return response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

}


export const activityService = new ActivityService()