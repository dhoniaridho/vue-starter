import http from '@/modules/http'
import type { ComputedRef } from 'vue'
import type Todo from '../models/todo'

const TodoRepository = {
  async getAll(): Promise<Todo[]> {
    const { data: response } = await http.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    )
    return response
  },
  async getOne(id: string | ComputedRef<string>): Promise<Todo> {
    const { data: response } = await http.get<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    )
    return response
  },
}

export default TodoRepository
