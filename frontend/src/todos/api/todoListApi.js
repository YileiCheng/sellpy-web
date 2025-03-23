import axios from 'axios'

export const getTodoLists = async () => {
  const res = await axios.get('/api/todoList')
  return res.data
}

export const updateTodoList = async (id, updatedList) => {
  const res = await axios.post(`/api/todoList/${id}`, updatedList)
  return res.data
}
