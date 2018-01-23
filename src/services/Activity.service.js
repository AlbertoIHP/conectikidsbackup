import { base } from './base'
import { socket } from './socket'
import axios from 'axios'


class ActivityService {

	index( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('activities')

	}

	show( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('activities/'+id)
			

	}

	update( id, activity, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('activities/'+id,  activity)

	}

	destroy( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.delete('activities/'+id)
			

	}


	store( activity )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		activity.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'

		return http.post( 'activities', JSON.stringify( activity ) )
	}


	getActivitiesByCourseId( id, token )
	{
		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		console.log(headers)

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('activities/getCourseActivities/'+id)

	}


}

export const activityService = new ActivityService();