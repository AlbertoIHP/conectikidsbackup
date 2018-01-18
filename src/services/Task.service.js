import { base } from './base'
import { socket } from './socket'
import axios from 'axios'



class TaskService {

	index ( token )
	{

		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('tasks')
			

	}

	show ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.get('tasks/'+id)

	}

	update ( id, task, token )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})


		return http.put('tasks/'+id, task)
			

	}

	destroy ( id, token )
	{
		let headers = { 'Authorization' : 'Bearer '+token }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		return http.delete('tasks/'+id)
			

	}


	store ( task )
	{

		let headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		let http = axios.create({ baseURL: base.api,  headers: headers	})

		task.access_token = 'rpDYa3XOEkAtYk67v5lDYprLz8cdbguP'


		return http.post( 'tasks', JSON.stringify( task ) )
			


	}

}


export default TaskService