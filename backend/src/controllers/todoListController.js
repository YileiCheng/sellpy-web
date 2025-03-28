import todoList from '../data/todoListData.js'

export const getTodoList = (req, res) => {
  res.json(todoList)
}

export const updateTodoList = (req, res) => {
  const { id } = req.params
  const updatedList = req.body

  const allCompleted = updatedList.todos.every((todo) => todo.completed)
  updatedList.allCompleted = allCompleted

  if (!todoList[id]) {
    return res.status(404).send('Todo list not found')
  }

  todoList[id] = updatedList
  res.status(200).send(updatedList)
}
