import { base } from './base'
import { socket } from './socket'
import axios from 'axios'
class CourseService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


			return http.get('courses')
			

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

			return http.get('courses/'+id)
			

	}

	update ( id, course, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.put('courses/'+id, course)
			

	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

			return http.delete('courses/'+id)
			

	}


	store ( course )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		course.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'


			return http.post( 'courses', JSON.stringify( course ) )
	}

	getCoursesByProfessorId ( professorId, token )
	{
		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.get('courses/getcoursebyuser/'+professorId)
	}

}


export const courseService = new CourseService();